import {
	getUserByToken
} from '../controllers/DevicesController';
import User from '../models/User';

export async function allowGuest(req,res,next){
	var api_token;
	if(req.body.token){
		api_token = req.body.token;
	}
	else if(req.params.token){
		console.log(req.params)
		api_token=req.params.token;
	}
	else{
		req.sender='';
		res.user='';
		next();
	}
	 

	console.log("token", req.body.token)
	// delete req.body.token;
	
	
	
	if (!api_token) {
		return res.status(401).json({
			message: 'Authentication failed. "token" in body is required.',
		});
	}

	const sender = await getUserByToken(api_token);
	if (sender.error) {
		console.log(sender.error)
		return res.status(401).json({
			message: 'Authentication failed. User not found.',
		});
	}
	if (sender.role == 'admin') {
		req.sender = sender;
		var userId;
		
		if (req.body.user_id) {
			console.log("t")
			userId = req.body.user_id;
		} else {
			userId = req.sender._id;
		}
		console.log('user_id>>>',userId)
		const user = await User.findById(userId);
		req.user = user;
		delete req.body.user_id;
	} else {
		req.sender = sender;
		req.user = sender;
	}
	console.log("AUTH COMPLETED")
	console.log("USER",req.user)
	console.log("SENDER",req.sender)
	req.body = req.body.data;
	// console.log(req)




	next();
}
export default async function auth(req, res, next) {
	console.log(req.body)
	var api_token;
	if(req.body.token){
		api_token = req.body.token;
	}
	else{
		console.log(req.params)
		api_token=req.params.token;
	}
	 

	console.log("token", req.body.token)
	// delete req.body.token;
	
	
	
	if (!api_token) {
		return res.status(401).json({
			message: 'Authentication failed. "token" in body is required.',
		});
	}

	const sender = await getUserByToken(api_token);
	if (sender.error) {
		console.log(sender.error)
		return res.status(401).json({
			message: 'Authentication failed. User not found.',
		});
	}
	if (sender.role == 'admin') {
		req.sender = sender;
		var userId;
		
		if (req.body.user_id) {
			console.log("t")
			userId = req.body.user_id;
		} else {
			userId = req.sender._id;
		}
		console.log('user_id>>>',userId)
		const user = await User.findById(userId);
		req.user = user;
		delete req.body.user_id;
	} else {
		req.sender = sender;
		req.user = sender;
	}
	console.log("AUTH COMPLETED")
	console.log("USER",req.user)
	console.log("SENDER",req.sender)
	req.body = req.body.data;
	console.log(req.body)




	next();
}