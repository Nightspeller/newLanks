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

    $('#delete-department-button').on('click', function(event){
        var confirm = window.confirm("Вы уверены? Это действие нельзя отменить!");
        if (confirm){
            $.ajax({
                url: '/editDepartment',
                data: {id: $('input[name=_id]').val()},
                type: 'DELETE',
                success: function (data) {
                    alert('Удалено');
                    console.log('Success: ', data);
                    window.location = '/admin'
                },
                error: function (error) {
                    alert('К сожалению произошла ошибка. Повторите попытку или обратитесь к администратору.');
                    console.log('Error: ', error)
                }
            });
        }
    })
});