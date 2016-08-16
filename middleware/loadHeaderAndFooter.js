module.exports = function(req,res,next){

    req.footer = res.locals.footer = null;
    req.header = res.locals.header = null;

    res.render('include/header', function(err, headerHtml){
        if (err) throw next(err);
        res.render('include/footer', function(err, footerHtml){
            if (err) throw next(err);
            res.render('include/tracking-dialog', function(err, trackingHtml){
                if (err) throw next(err);
                req.header = res.locals.header = headerHtml;
                req.footer = res.locals.footer = footerHtml;
                req['tracking-dialog'] = res.locals['tracking-dialog'] = trackingHtml;
                next();
            });
        });
    });

};