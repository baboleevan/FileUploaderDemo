
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('logs', { title: 'Express' });
};