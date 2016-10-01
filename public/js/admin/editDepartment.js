$(document).ready(function() {
    $('form').submit(function (e) {
        e.preventDefault();
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: '/editDepartment',
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (data) {
                alert('Успешно добавлено!');
                console.log('Success: ', data)
            },
            error: function (error) {
                alert('К сожалению произошла ошибка. Повторите попытку или обратитесь к администратору.');
                console.log('Error: ', error)
            }
        });
    });
});