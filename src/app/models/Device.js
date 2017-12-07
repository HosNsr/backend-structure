import mongoose from 'mongoose';

const deviceSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
		type: Number,
		default: 0
		//0 => active
		// 1 => deactive
		// 2 =>deleted
	},
    ip: {
        type: String,
        required: true
    },
    browser: {
        type: String
    },
    os: {
        type: String
    },
    created_at: Date,
    updated_at: Date,
});

deviceSchema.pre('save', function (next) {
    this.created_at = this.updated_at = new Date();
    next();
});

export default mongoose.model('Device', deviceSchema)