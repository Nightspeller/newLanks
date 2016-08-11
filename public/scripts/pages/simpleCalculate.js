$(document).ready(function() {
   /* $('form').submit(function (e) {
        e.preventDefault();
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: '/simpleCalculate',
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (data) {
                if (date.price){
                    $('#resultPrice').text('Цена: ' + Math.floor(data.price));
                } else {
                    $('#resultPrice').text('Проверьте правильность заполнения полей');
                }

                console.log('Success: ', data)
            },
            error: function (error) {
                alert('К сожалению произошла ошибка. Повторите попытку или обратитесь к администратору.');
                console.log('Error: ', error)
            }
        });
    });*/


    $("#requestPrice").on('submit',{path: '/'}, send_form_data);
});