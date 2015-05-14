$(document).ready(function() {
    $("#images img").click(function(){
        $("article section").hide();
        $("#section"+this.id).show();
        var destination = $("article").offset().top;
        $("html,body").animate({scrollTop: destination}, 800);
    });
    
	var current_tab = param("param");
    var current_id = param('id');
    if (current_tab != "") {
        if (current_tab == 'oriflame') current_tab = 6;
        $("#"+current_tab).click();
    }

    $("#track_button").click(function(){
        $("#section4 div").remove();
        $("#section4").append('<div><strong>Груз с таким номером не внесен в систему.</div>');
        $("#section4").append('<div><strong>Пожалуйста, проверьте номер груза или <a href="/question">свяжитесь c оператором</a>.</div>');
    });
	$("#track_orif_button").click(function(){
        var id = $("#track_orif_id").val();
        $("#track_orif_button").prop("disabled", true).prop("value", "Идет поиск");

        $.ajax({
            url: '/online/oriflame?invoice='+id,
            type: 'GET',
            success: function (data) {
                console.log(data);
                $("#track_orif_button").prop("disabled", false).prop("value", "Проверить");
                // Здесь мы получаем данные, отправленные сервером и выводим их на экран.
                if (data.length === 1) {
                    $("#section6 div").remove();
                    $("#section6").append('<div><strong>ФИО: </strong>'+data[0].name+'<br />' +
                        '<strong>Номер накладной: </strong>'+data[0].invoiceNumber+'<br />' +
                        '<strong>Номер консультанта: </strong>'+data[0].contractNumber+'<br />' +
                        '<strong>Адрес доставки: </strong>'+data[0].address+'<br />' +
                        '<strong>Контакт. телефон: </strong>'+data[0].phone+'<br />' +
                        '<strong>Количество коробок: </strong>'+data[0].boxes+'<br />' +
                        '<strong>Дата доставки: </strong>'+data[0].deliveryDate+'<br />' +
                        '<strong>Время доставки: </strong>'+data[0].deliveryTime+'<br />' +
                        '<strong>Водитель: </strong>'+data[0].driver+'<br />' +
                        '<strong>Сумма накладной: </strong>'+data[0].invoiceAmount+'<br />' +
                        '<strong>Сумма чека: </strong>'+data[0].checkAmount+'<br />' +
                      //  '<strong>Тип клиента: </strong>'+data[0].clientType+'<br />' +
                      //  '<strong>Пункт сбора: </strong>'+data[0].collectionPoint+'<br />' +
                        '<strong>Дата заказа: </strong>'+data[0].orderDate+'<br />' +
                        '<strong>Оплата: </strong>'+data[0].payment+'<br />' +
                        '<strong>Статус: </strong>'+data[0].status+'<br />' +
                      //  '<strong>Вес: </strong>'+data[0].weight+'<br />' +
                        '</div>');
                    $('.clientWarning').show();
                } else {
                    $("#section6 div").remove();
                    $("#section6").append('<div><strong>Заказа с таким номером не найдено.</div>');
                    $("#section6").append('<div><strong>Пожалуйста, проверьте номер заказа или <a href="/question">свяжитесь c оператором</a>.</div>');
                }
            },
            error: function (error) {
                alert('К сожалению произошла ошибка. Повторите попытку или обратитесь к администратору.');
                console.log('Error: ', error)
            }
        });
    });

    $('.clientWarning-overlay, .clientWarningButton').on('click', function () {
        $('.clientWarning').hide();
    });

    if (current_id != "") {
        $("#track_orif_id").val(current_id);
        $("#track_orif_button").click();
    }
});