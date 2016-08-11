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

$(function(){

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-49980548-3', 'ланкс.рф');
    ga('send', 'pageview');


    $('.btn_blue.ras .mdl-button.zapr').click(function(){
        $('.form_contact_section').css('height', '520px');
        $('.form_contact_section').addClass('openf');
        $(this).css('display', 'none');
        $('.close_form_contact_section').css('display', 'block');
    });

    $('.close_form_contact_section').click(function(){
        $('.form_contact_section').css('height', '0px');
        $('.btn_blue.ras .mdl-button').css('display', 'block');
        $(this).css('display', 'none');
        $('.form_contact_section').removeClass('openf');
    });

    $('.mdl-button.open_contact').click(function(){
        $('.phone_head').css('display', 'none');
        $('.phone_head_section').css('height', 'auto');
    });

    $('.phone_head .list_btn').click(function(){
        $('.phone_head').css('display', 'none');
        $('.phone_head_section').css('height', 'auto');
    });

    $('.close_phone_head_section').click(function(){
        $('.phone_head_section').css('height', '0px');
        $('.phone_head').css('display', 'block');
    });

    var dialog = document.querySelector('dialog');
    var showDialogButton = document.querySelector('#show-dialog');
    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    showDialogButton.addEventListener('click', function() {
        dialog.showModal();
    });
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
    });

    dialog.querySelector('.m_close').addEventListener('click', function() {
        dialog.close();
    });
});

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