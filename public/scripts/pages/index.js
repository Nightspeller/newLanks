$(document).ready(function() {
    $('#myCanvas').tagcanvas({
        textColour : '#000', // Цвет текста
        outlineThickness : 0, // Обводка у ссылок (Да, Нет)
        maxSpeed : 0.03, // Максимальная скорость
        depth : 0.9, // Глубина. От 0 до 1
        outlineColour: '#40c4ff'
    });

    $("#price-request-form").on('submit',{path: '/'}, send_form_data);
});