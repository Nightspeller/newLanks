module.exports = function(req,res,next){

    req.footer = res.locals.footer = null;
    req.header = res.locals.header = null;
    req['contact-menu'] = res.locals['contact-menu'] = null;

    var page = req.path.toLocaleLowerCase().split("/")[1];
    var pages = {
        'about': page === 'about',
        'services': page === 'services',
        'departments': page === 'departments',
        'online': page === 'online',
        'news': page === 'news'
    };

    res.render('include/header',{pages:pages}, function(err, headerHtml){
        if (err) throw next(err);
        res.render('include/footer', function(err, footerHtml){
            if (err) throw next(err);
            var menu = 'contact-menu';
            if (req.path.toLocaleLowerCase().split("/")[2] === 'belarus') {
                menu = 'contact-menu-belarus';
            }
            res.render('include/'+menu, function(err, contactMenuHtml){
                if (err) throw next(err);
                req.header = res.locals.header = headerHtml;
                req.footer = res.locals.footer = footerHtml;
                req[menu] = res.locals[menu] = contactMenuHtml;
                next();
            });
        });
    });

};