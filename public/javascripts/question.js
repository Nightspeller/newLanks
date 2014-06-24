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

	$("#ask_question").on('submit',{path: '/question?type=callMe'}, send_form_data);
    $("#quality").on('submit',{path: '/question?type=quality'}, send_form_data);
	
});
