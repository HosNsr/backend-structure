import Device from '../models/Device';


export async function getUserByToken(token) {
	try {
		const device = await Device.findById(token).populate('user');

		console.log("user found by token",device.user)
		return device.user
	} catch (err) {
		return {
			error: err
		}
	}
}
