export default function ResponseTransformer(req, res, next) {
	const json = res.json;
	const { params } = req;

	res.json = function(data) {
		const responseSchema = {
			meta: {},
			result: data,
		};
	
		json.call(this, responseSchema)
	};

	next();
}