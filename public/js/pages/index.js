$(document).ready(function() {
    $('#myCanvas').tagcanvas({
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

    $("#price-request-form").on('submit',{path: '/'}, send_form_data);
});