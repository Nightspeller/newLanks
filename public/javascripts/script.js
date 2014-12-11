$(document).ready(function()
{
    $('#phoneChooser select').on('change', function(){
        console.log($(this),$(this).text(),$(this).val());
        $('#phoneNum').text($(this).val());
    });
});

function send_form_data(event){
    event.preventDefault();
    alert("Спасибо! Ваше сообщение отправляется!");
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: event.data.path,
        data: formData,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
            console.log('Success: ', data)
        },
        error: function (error) {
            alert('К сожалению произошла ошибка. Повторите попытку или обратитесь к администратору.');
            console.log('Error: ', error)
        }
    });
}

function param(Name)
{
    var Params = location.search.substring(1).split("&");
    var variable = "";
    for (var i = 0; i < Params.length; i++)
    {
        if(Params[i].split("=")[0] == Name)
        {
            if (Params[i].split("=").length > 1)
                variable = Params[i].split("=")[1];
            return variable;
        }}
    return "";
}

(function($){
    $(function(){
        var e = $(".scrollTop");

        e.click(function(){
            $("html:not(:animated)" +( !$.browser.opera ? ",body:not(:animated)" : "")).animate({ scrollTop: 0}, 500 );
            return false;
        });
        function show_scrollTop(){
            ( $(window).scrollTop()>300 ) ? e.fadeIn(600) : e.hide();
        }
        $(window).scroll( function(){show_scrollTop()} ); show_scrollTop();
    });

})(jQuery);

/**
 * jquery.snow - jQuery Snow Effect Plugin
 *
 * Available under MIT licence
 *
 * @version 1 (21. Jan 2012)
 * @author Ivan Lazarevic
 * @requires jQuery
 * @see http://workshop.rs
 *
 * @params minSize - min size of snowflake, 10 by default
 * @params maxSize - max size of snowflake, 20 by default
 * @params newOn - frequency in ms of appearing of new snowflake, 500 by default
 * @params flakeColor - color of snowflake, #FFFFFF by default
 * @example $.fn.snow({ maxSize: 200, newOn: 1000 });
 */
(function($){

    $.fn.snow = function(options){

        var $flake 			= $('<div class="flake" />').css({'position': 'absolute', 'top': '-50px', 'z-index': '100'}).html('&#10052;'),
            documentHeight 	= $(document).height(),
            documentWidth	= $(document).width(),
            defaults		= {
                minSize		: 20,
                maxSize		: 30,
                newOn		: 500,
                flakeColor	: "#0000FF"
            },
            options			= $.extend({}, defaults, options);


        var interval;

        $('#snowSwitch').on('click', function (){
            if (localStorage.getItem('snowState') === 'on') {
                clearInterval(interval);
                $('.flake').remove();
                localStorage.setItem('snowState','off');
            } else {
                localStorage.setItem('snowState','on');
                interval = setInterval( function(){
                    var startPositionLeft 	= Math.random() * documentWidth - 100,
                        startOpacity		= 0.5 + Math.random(),
                        sizeFlake			= options.minSize + Math.random() * options.maxSize,
                        endPositionTop		= documentHeight - 100,
                        endPositionLeft		= startPositionLeft - 100 + Math.random() * 200,
                        durationFall		= documentHeight * 10 + Math.random() * 5000;
                    $flake
                        .clone()
                        .appendTo('body')
                        .css(
                        {
                            left: startPositionLeft,
                            opacity: startOpacity,
                            'font-size': sizeFlake,
                            color: options.flakeColor
                        }
                    )
                        .animate(
                        {
                            top: endPositionTop,
                            left: endPositionLeft,
                            opacity: 0.2
                        },
                        durationFall,
                        'linear',
                        function() {
                            $(this).remove()
                        }
                    );
                }, options.newOn);
            }
        });

        if (localStorage.getItem('snowState') !== 'off') {
            localStorage.setItem('snowState','on');
            interval = setInterval( function(){
                var startPositionLeft 	= Math.random() * documentWidth - 100,
                    startOpacity		= 0.5 + Math.random(),
                    sizeFlake			= options.minSize + Math.random() * options.maxSize,
                    endPositionTop		= documentHeight - 100,
                    endPositionLeft		= startPositionLeft - 100 + Math.random() * 200,
                    durationFall		= documentHeight * 10 + Math.random() * 5000;
                $flake
                    .clone()
                    .appendTo('body')
                    .css(
                    {
                        left: startPositionLeft,
                        opacity: startOpacity,
                        'font-size': sizeFlake,
                        color: options.flakeColor
                    }
                )
                    .animate(
                    {
                        top: endPositionTop,
                        left: endPositionLeft,
                        opacity: 0.2
                    },
                    durationFall,
                    'linear',
                    function() {
                        $(this).remove()
                    }
                );
            }, options.newOn);
        }

    };

})(jQuery);