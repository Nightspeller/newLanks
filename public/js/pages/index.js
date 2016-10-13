$(document).ready(function() {
    $('#tag-cloud-canvas').tagcanvas({
        textColour : '#000', // Цвет текста
        outlineThickness : 0, // Обводка у ссылок (Да, Нет)
        maxSpeed : 0.03, // Максимальная скорость
        depth : 0.9, // Глубина. От 0 до 1
        outlineColour: '#40c4ff',
        textHeight: 10,
        outlineOffset: 0,
        initial: [0.05, 0.05],
        minSpeed: 0.005
    });

    $('.carousel').slick({
        autoplay: true,
        arrows: false,
        pauseOnHover: false,
        pauseOnFocus: false
    });

    $('.request-button').click(function(){
        $('.request-form').addClass('opened');
        $(this).css('display', 'none');
    });

    $('.request-close-button').click(function(){
        $('.request-form').removeClass('opened');
        $('.request-button').css('display', 'flex');
    });

    $("#price-request-form").on('submit',{path: '/'}, send_form_data);
});