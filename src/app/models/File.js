import mongoose from 'mongoose';

const fileSchema = mongoose.Schema({
	path: {
		type: String,
		required: true,
	},
	status: {
		type: Number,
		default: 0
		//0 => active
		// 1 => deactive
		// 2 =>deleted
	},
	owner:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Business',
		required:true

	},
	created_at: Date,
	updated_at: Date,
});

fileSchema.pre('save', function(next) {
	this.created_at = this.updated_at = new Date();
	next();
});

export default mongoose.model('File', fileSchema);