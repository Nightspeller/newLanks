$(document).ready(function() {
    $('#loginForm').submit(function(event){
        event.preventDefault();
        var formData = new FormData($(this)[0]);
        console.log($(this)[0])
        $.ajax({
            url: '/login',
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
                location.reload();
                console.log('Success: ', data)
            },
            error: function(error){
                console.log('Error: ', error);
                var errorMessage = $('#errorMessage');
                switch (error.status){
                    case 403:
                        alert('Неверный пароль');
                        break;
                    case 404:
                        alert('Неверный логин');
                        break;
                    default :
                        alert('К сожалению произошла ошибка. Повторите попытку или обратитесь к администратору.');
                        break;
                }
            }
        });
    });
    $('#logoutButton').on('click', function(){
        $.ajax({
            url: '/login?action=out',
            type: 'POST',
            success: function(data){
                location.reload();
                console.log('Success: ', data)
            },
            error: function(error){
                alert('К сожалению произошла ошибка. Повторите попытку или обратитесь к администратору.');
                console.log('Error: ', error)
            }
        });
    })
});