$(document).ready(function(){
    $('.albumCaption').on('click', function(event){
        var albumId = $(this).data("id");
        $('.albumContent:visible').hide();
        $('.albumContent').filter(function() {
            return $(this).data("id") == albumId
        }).toggle();
    })
});