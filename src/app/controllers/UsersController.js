import crypto from 'crypto';
import User from '../models/User';
import Device from '../models/Device';

export async function history(req, res) {
	console.log("what's wrong dude?:/")
	var businesses = await Business.find({ 'seen.user': req.user._id }).populate('images').populate('comments')
		.populate('likes');
	return res.status(200).json({ businesses: businesses });
}

export async function search(req, res) {
	console.log(req.body)
	var { full_name, gender, status } = req.body;
	console.log(status)
	var query = {};
	if (full_name != undefined && full_name != "") {
		query['full_name'] = { $regex: full_name, $options: 'i' };
	}
	if (gender != undefined && gender != "") {
		query['gender'] = gender;
	}
	if (status != undefined && status != "") {
		console.log('status', status)
		query['status'] = status;
		console.log(query)
	}
	console.log(query)
	const users = await User.find(query).populate('comments');
	return res.status(200).json({
		users: users
	})
}

export async function getUsers(req, res) {
	console.log("hello")
	try {
		console.log("hi")
		const users = await User.find({})
			.populate('businesses')
			.populate('comments')
			.limit(Number(req.query.limit) || 10)
			.sort({
				created_at: Number(req.query.sort) || 1
			});
		console.log("dude")

		return res.json({
			users,
		});
	} catch (err) {
		return res.status(400).json({
			message: err.message,
		});
	}
}

export async function getUserById(req, res) {
	const {
		id
	} = req.body;
	const user = await User.findById(id)
		.populate('comments')
		.populate('businesses');

	return res.json({
		user,
	});
}

export async function getCurrentLoggedInUser(req, res) {
	const id = req.user._id;
	const user = await User.findById(id)
		.populate('businesses')
		.populate('comments');


	return res.json({
		user,
	});
}

export async function deleteUserById(req, res) {
	const user = await User.findByIdAndUpdate(req.user._id, {
		status: 3
	}, {
			new: true
		}).populate('businesses')
		.populate('comments');;

	return res.json({
		user,
	});
}

export async function status(req, res) {
	const user = await User.findOneAndUpdate({
		_id: req.body.user_id
	}, {
			$set: {
				status: req.body.user_status
			}
		}).populate('businesses')
		.populate('comments');;

	return res.json({
		user,
	});
}

export async function addToFavorites(req, res) {
	const {
		business_id
	} = req.body;
	const business = await Business.findById(business_id);

	const {
		favorites
	} = await User.findByIdAndUpdate(req.user._id, {
			$addToSet: {
				favorites: business.id,
			}
		}, {
				new: true
			}).populate('businesses')
			.populate('comments');;

	return res.json({
		success: true,
	});
}

export async function getUserByApiToken(api_token) {

	return await User.findOne({
		api_token
	});
}

export async function saveUser(req, res) {
	const {
		email,
		password,
		first_name,
		last_name,
		status,
		phone,
		gender,
		area
	} = req.body.user;
	console.log(req.body.user)

	const user = new User({
		email,
		password,
		first_name,
		last_name,
		status,
		phone,
		gender,
		area,
		api_token: null,
	});

	try {
		var savedUser = await user.save();
		var {
			ip,
			os,
			browser
		} = req.body.device;
		var savedDevice = await new Device({
			user: savedUser._id,
			ip: ip,
			os: os,
			browser: browser
		}).save();


		return res.json({
			user: user,
			token: savedDevice._id
		});
	} catch (err) {
		return res.status(400).json({
			message: err.message,
		});
	}
}

export async function updateUser(req, res) {
	const {
		id,
		first_name,
		last_name,
		phone,
		gender,
		status
	} = req.body;

	const user = await User.findByIdAndUpdate(id, {
		$set: {
			first_name,
			last_name,
			status,
			phone,
			gender,
		}
	}, {
			new: true
		}).populate('businesses')
		.populate('comments');

	try {
		return res.json({
			user,
		});
	} catch (err) {
		return res.status(400).json({
			message: err.message,
		});
	}
}

export async function login(req, res) {
	const {
		email,
		password
	} = req.body.user;

	const foundUser = await User.findOne({
		email,
		password
	}).populate('comments')
		.populate('businesses');

	if (!foundUser) {
		return res.status(401).json({
			message: 'Authentication failed. User not found.'
		});
	}

	var {
		ip,
		os,
		browser
	} = req.body.device;
	var savedDevice = await new Device({
		user: foundUser._id,
		ip: ip,
		os: os,
		browser: browser
	}).save();
	res.json({
		token: savedDevice._id,
		user: foundUser,
	});
}