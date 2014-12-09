module.exports = function(req,res,next){
    if (req.url.indexOf('shtml') !== -1){
        return res.redirect(req.url.split('.')[0]);
    }
    next();
};