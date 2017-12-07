import File from '../models/File';

export async function get(req, res) {
	const businesses = await Business.find({}).populate('owner');
	return res.json({
		businesses,
	});
}
export async function add(req, res) {
	const file=new File({path:req.body.path});
	return res.json({
		file
	});
}

export async function upload(req, res) {
	console.log(req.query.record)
	const path = require('path')
	const fs = require('fs');
	const formidable = require('formidable');
	
	var newFiles = [];
	var form = new formidable.IncomingForm();
	form.multiples = true;
	form.uploadDir = path.join(__dirname, '../../../public/files');
	
	

	form.on('file', function (field, file) {
		var filePath = path.join(form.uploadDir, file.name);
		var filePathForDb = path.join('/files/', file.name);

		fs.rename(file.path, filePath);
		newFiles.push(new File({
			path: filePathForDb,
			owner: req.user
		}));
		
	});

	form.on('error', function (err) {
		console.log('An error has occured: \n' + err);
	});

	form.on('end', function () {
		var async = require('async')
		var files = [];
		async.eachSeries(newFiles, function (file, asyncdone) {
			console.log('asyncdone', asyncdone)
			file.save(function(err,result){
				console.log(result)
				console.log(err)
				files.push(result);
				asyncdone();
			});
		}, function (err) {
			if (err) return console.log(err);
			res.send({files:files});
		});
	});

	form.parse(req);

}
