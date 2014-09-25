$(document).ready(function() {
    $('#newsForm').submit(function (e) {
        e.preventDefault();
        var formData = new FormData($(this)[0]);
        var type = 'PUT';
        if (!$('input[name=_id]').val()) type = 'POST';
        $.ajax({
            url: '/news',
            data: formData,
            processData: false,
            contentType: false,
            type: type,
            success: function (data) {
                alert('Обновлено добавлено!');
                console.log('Success: ', data)
            },
            error: function (error) {
                alert('К сожалению произошла ошибка. Повторите попытку или обратитесь к администратору.');
                console.log('Error: ', error)
            }
        });
    });
    $('.deleteButton').on('click', function(event){
        $.ajax({
            url: '/news',
            data: {id: $(this).data('id')},
            type: 'DELETE',
            success: function (data) {
                $(event.target).hide().prev().hide();
                alert('Удалено');
                console.log('Success: ', data)
            },
            error: function (error) {
                alert('К сожалению произошла ошибка. Повторите попытку или обратитесь к администратору.');
                console.log('Error: ', error)
            }
        });
    })
});