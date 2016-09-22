$(function(){

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-49980548-3', 'ланкс.рф');
    ga('send', 'pageview');


    $('.btn_blue.ras .mdl-button.zapr').click(function(){
        $('.form_contact_section').css('height', '520px');
        $('.form_contact_section').addClass('openf');
        $(this).css('display', 'none');
        $('.close_form_contact_section').css('display', 'block');
    });

    $('.close_form_contact_section').click(function(){
        $('.form_contact_section').css('height', '0px');
        $('.btn_blue.ras .mdl-button').css('display', 'block');
        $(this).css('display', 'none');
        $('.form_contact_section').removeClass('openf');
    });

    $('.mdl-button.open_contact').click(function(){
        $('.phone_head').css('display', 'none');
        $('.phone_head_section').css('height', 'auto');
    });

    $('.phone_head .list_btn').click(function(){
        $('.phone_head').css('display', 'none');
        $('.phone_head_section').css('height', 'auto');
    });

    $('.close_phone_head_section').click(function(){
        $('.phone_head_section').css('height', '0px');
        $('.phone_head').css('display', 'block');
    });

    initializeContactDialog();

    initializeTracking();
});

function initializeContactDialog(){
    var dialog = document.querySelector('#contact-dialog');
    var showDialogButton = document.getElementsByClassName('show-contact-dialog');
    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    console.log(showDialogButton);
    for (var i = 0; i < showDialogButton.length; i++) {
        showDialogButton[i].addEventListener('click', function() {
            dialog.showModal();
        });
    }

    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
    });

    dialog.querySelector('.m_close').addEventListener('click', function() {
        dialog.close();
    });

    $("#contact-dialog-form").on('submit',{path: '/question?type=callMe'}, send_form_data);
}

function initializeTracking() {
    $('#tracking-form').on('submit', function (event) {
        event.preventDefault();

        var id = $('#code').val();

        $.ajax({
            url: 'http://lanks.net/online/oriflame?invoice='+id,
            type: 'GET',
            success: function (data) {
                console.log(data);

                if (data.length === 1) {
                    var dialog = document.querySelector('#tracking-dialog');
                    if (! dialog.showModal) {
                        dialogPolyfill.registerDialog(dialog);
                    }

                    dialog.querySelector('.close').addEventListener('click', function() {
                        dialog.close();
                    });

                    dialog.querySelector('.m_close').addEventListener('click', function() {
                        dialog.close();
                    });

                    $(dialog).find('.orderInfo').remove();
                    $(dialog).find('h4').after('<div class="orderInfo"><strong>ФИО: </strong>'+data[0].name+'<br />' +
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
                        '</div>');

                    dialog.showModal();
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