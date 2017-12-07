import mongoose from 'mongoose';

/**
 * users' status:
 * 	- true => active
 *  - false => banned
 */
const userSchema = mongoose.Schema({

	email: {
		type: String,
		required: true,
		unique: true,
	},
	phone: {
		type: String,
		unique: true
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type:String,
		default:'user'
	},
	full_name: {
		type: String,


	},

	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	status: {
		type: Number,
		// 0 -> active
		// 1 -> deactive
		// 2 -> delete
		required: true,
		default: 0
	},

	businesses: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Business',
	},


	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}],
	gender: String,
	area: {
		lat: Number,
		long: Number
	},
	created_at: Date,
	updated_at: Date,
});

// @TODO hash password
userSchema.pre('save', function (next) {
	this.created_at = this.updated_at = new Date();
	next();
});

userSchema.pre('save', function (next) {
	this.full_name = this.first_name + ' ' + this.last_name
	next();
});

userSchema.pre('update', function () {
	this.update({}, {
		$set: {
			updated_at: new Date()
		}
	});
});

export default mongoose.model('User', userSchema);