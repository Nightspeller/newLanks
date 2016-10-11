module.exports = function(req,res,next){

    req.meta = res.locals.meta = null;

    var page = req.originalUrl.toLocaleLowerCase().split("/")[1];
    var pages = {
        'about': page === 'about',
        'services': page === 'services',
        'departments': page === 'departments',
        'online': page === 'online',
        'news': page === 'news'
    };

    res.render('include/meta',{page: page}, function(err, metaHtml){
        if (err) throw next(err);
        req.meta = res.locals.meta = metaHtml;
        next();
    });
};