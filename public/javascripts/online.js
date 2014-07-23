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