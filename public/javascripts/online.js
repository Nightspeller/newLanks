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
        var id = $("#track_id").val();
        $.post(
            "wsgi/.cargo_script.wsgi",
            {
                "id": id
            },
            onAjaxSuccess
        );

        function onAjaxSuccess(data)
        {
            // Здесь мы получаем данные, отправленные сервером и выводим их на экран.
			if (data != "") {
				var split_data = data.split("&");
				$("#section4 div").remove();
				$("#section4").append('<div><strong>Отправлено из: </strong>'+(split_data[1].split(":"))[1]+'</div>');
				$("#section4").append('<div><strong>Дата отправления: </strong>'+(split_data[3].split(":"))[1]+'</div>');
				$("#section4").append('<div><strong>Отправлено в: </strong>'+(split_data[2].split(":"))[1]+'</div>');
				$("#section4").append('<div><strong>Ориентировочная дата прибытия: </strong>'+(split_data[4].split(":"))[1]+'</div>');
				switch ((split_data[0].split(":"))[1]){
					case "in_way": {
						$("#section4").append('<div><strong>Статус груза: </strong>В пути.</div>');
						break;
					}
					case "on_stock": {
						$("#section4").append('<div><strong>Статус груза: </strong>На складе.</div>');
						break;
					}
					case "arrived": {
						$("#section4").append('<div><strong>Статус груза: </strong>Прибыл.</div>');
						break;
					}
	
				}
			} else {
				$("#section4 div").remove();
				$("#section4").append('<div><strong>Груза с таким номером не найдено.</div>');
				$("#section4").append('<div><strong>Пожалуйста, проверьте номер груза или свяжитесь c оператором.</div>');
			}

        }

    });
	$("#track_orif_button").click(function(){
        var id = $("#track_orif_id").val();
        $("#track_orif_button").prop("disabled", true).prop("value", "Идет поиск");
        $.post(
            "wsgi/.new_oriflame_script.wsgi",
            {
                "id": id
            },
            function (data)
            {
                $("#track_orif_button").prop("disabled", false).prop("value", "Проверить");
                // Здесь мы получаем данные, отправленные сервером и выводим их на экран.
                if (data != "") {
                    var split_data = data.split("&");
                    $("#section6 div").remove();
                    for (var i=0; i < split_data.length-1;i++) {
                        split_data[i] = split_data[i].replace(':','&');
                        $("#section6").append('<div><strong>'+(split_data[i].split("&"))[0]+': </strong>'+(split_data[i].split("&"))[1]+'</div>');
                    }
                } else {
                    $("#section6 div").remove();
                    $("#section6").append('<div><strong>Заказа с таким номером не найдено.</div>');
                    $("#section6").append('<div><strong>Пожалуйста, проверьте номер заказа или свяжитесь c оператором.</div>');
                }

            }
        );

    });

    if (current_id != "") {
        $("#track_orif_id").val(current_id);
        $("#track_orif_button").click();

    }
});