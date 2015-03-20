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