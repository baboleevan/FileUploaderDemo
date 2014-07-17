var formidable = require('formidable'),
    fs = require('fs'),
    path = require('path');

exports.create = function(req, res){
    var result = [],
        uploadPath = req.query.path,
        form = new formidable.IncomingForm();

    form.uploadDir = uploadPath;
    form.hash = false;

    form.on('file', function(field, file) {
        var type    = file.type.replace(/image(\/)([\w]+)/g, '.$2'),
            newPath = path.join(uploadPath, '/', file.name);

        result.push(newPath.replace(/[\w]+(\/.+)/g, "$1"));
        fs.renameSync(file.path, newPath);
    });

    form.on('end', function() {
        res.send({path : result});
    });

    form.parse(req);
};