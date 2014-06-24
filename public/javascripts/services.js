$(document).ready(function()
{
    $("#images img").click(function(){
        $("article section").hide();
        $("#section"+this.id).show();
        var destination = $("article").offset().top;
        $("html,body").animate({scrollTop: destination}, 800);
    });
    var current_tab = param("param");
    if (current_tab != "") {
        $("#"+current_tab).click();
    }
    //обработка выбора города для сборного груза
    $("#select_sborni_gruz_from").change(function(){
       // alert("Прайс недоступен, перезвоните в филиал для уточнения расценок.");
        window.location = "../../for_download/sborni_gruz_prices/Прайс из города "+$('#select_sborni_gruz_from option:selected').text()+".xls";
    });
	$("#select_sborni_gruz_to").change(function(){
       // alert("Прайс недоступен, перезвоните в филиал для уточнения расценок.");
        window.location = "../../for_download/sborni_gruz_prices/Прайс в "+$('#select_sborni_gruz_to option:selected').text()+".xls";
    });
});