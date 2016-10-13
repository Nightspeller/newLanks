$(function(){

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-49980548-3', 'ланкс.рф');
    ga('send', 'pageview');


    $('.contact-menu .contact-controls').click(function(){
        $('.contact-controls').css('visibility', 'hidden');
        $('.contact-info').css('display', 'block');
    });

    $('.contact-menu .contact-menu-close').click(function(){
        $('.contact-info').css('display', 'none');
        $('.contact-controls').css('visibility', 'visible');
    });

    initializeTracking();
});

function showContactDialog(){
    vex.dialog.open({
        message: 'Предоставьте информацию о себе:',
        input:
        '<form id="contact-dialog-form">'+
        '<label for="name">Имя</label>'+
        '<input pattern="[A-Z,a-z, ]*" type="text" id="name" name="name">'+
        '<label for="phone">Телефон</label>'+
        '<input type="text" id="phone" name="phone">'+
        '<label for="email">E-mail</label>'+
        '<input type="text" id="email" name="email">'+
        '<label for="message">Сообщение</label>'+
        '<input type="text" id="message" name="message">'+
        '<label for="callMe">Жду ответа</label>'+
        '<input type="checkbox" id="callMe" name="callMe" value="Да" checked>'+
        '</form>'
        ,buttons: [
            $.extend({}, vex.dialog.buttons.YES, { text: 'Отправить' }),
            $.extend({}, vex.dialog.buttons.NO, { text: 'Отмена' })
        ],
        callback: function (data) {
            if (!data) {
                console.log('Cancelled')
            } else {
                $("#contact-dialog-form").on('submit',{path: '/question?type=callMe'}, send_form_data);
                $("#contact-dialog-form").submit();
                console.log('Done');
            }
        }
    });
}

function showRequestPriceDialog(){
    vex.dialog.open({
        message: 'Предоставьте информацию о себе и перевозке:',
        input:
        '<form id="request-price-dialog-form">'+
        '<label for="cityFrom">Пункт отправления</label>'+
        '<input type="text" id="cityFrom" name="cityFrom">'+
        '<label for="cityTo">Пункт назначения</label>'+
        '<input type="text" id="cityTo" name="cityTo">'+
        '<label for="cargo">Вес, объем, характер груза</label>'+
        '<input type="text" id="cargo" name="cargo">'+
        '<label for="contact">Телефон и/или e-mail</label>'+
        '<input type="text" id="contact" name="contact">'+
        '</div>'+
        '</form>'
        ,buttons: [
            $.extend({}, vex.dialog.buttons.YES, { text: 'Запросить' }),
            $.extend({}, vex.dialog.buttons.NO, { text: 'Отмена' })
        ],
        callback: function (data) {
            if (!data) {
                console.log('Cancelled')
            } else {
                $("#request-price-dialog-form").on('submit',{path: '/'}, send_form_data);
                $("#request-price-dialog-form").submit();
                console.log('Done');
            }
        }
    });
}

function showComplainDialog(){
    vex.dialog.open({
        message: 'Ваше сообщение будет получено лично территорияльным руководителем и не останется без внимания.',
        input:
        '<form id="complain-dialog-form">' +
        '<label for="complain-name">Имя</label>' +
        '<input pattern="[A-Z,a-z, ]*" type="text" id="complain-name" name="name">' +
        '<label for="complain-phone">Телефон</label>' +
        '<input type="text" id="complain-phone" name="phone">' +
        '<label for="complain-email">E-mail</label>' +
        '<input type="text" id="complain-email" name="email">' +
        '<label for="complain-company">Компания</label>' +
        '<input type="text" id="complain-company" name="company">' +
        '<label for="complain-message">Сообщение</label>' +
        '<input type="text" id="complain-message" name="message">' +
        '</form>'
        ,buttons: [
            $.extend({}, vex.dialog.buttons.YES, { text: 'Отправить' }),
            $.extend({}, vex.dialog.buttons.NO, { text: 'Отмена' })
        ],
        callback: function (data) {
            if (!data) {
                console.log('Cancelled')
            } else {
                $("#complain-dialog-form").on('submit',{path: '/question?type=complain'}, send_form_data);
                $("#complain-dialog-form").submit();
                console.log('Done');
            }
        }
    });
}

function initializeTracking() {

    $('#tracking-form').on('submit', function (event) {
        event.preventDefault();

        var id = $('#code').val();

        $.ajax({
            url: 'online/oriflame?invoice='+id,
            type: 'GET',
            success: function (data) {
                if (data.length === 1) {
                    vex.dialog.alert({
                        message: 'Информация о Вашем заказе:',
                        input:
                            '<div class="orderInfo"><strong>ФИО: </strong>'+data[0].name+'<br />' +
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
                            //20028046164
                            '</div>'
                        ,
                        callback: function (data) {
                            if (!data) {
                                return console.log('Cancelled')
                            }
                            console.log('Done');
                        }
                    });
                } else {
                    alert('Заказа с таким номером не найдено. Свяжитесь с оператором. Спасибо!');
                }
            },
            error: function (error) {
                alert('К сожалению произошла ошибка. Повторите попытку или обратитесь к администратору.');
                console.log('Error: ', error)
            }
        });
    })
}

function send_form_data(event){
    event.preventDefault();
    alert("Спасибо! Ваше сообщение отправляется, оператор скоро свяжется с Вами.");
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