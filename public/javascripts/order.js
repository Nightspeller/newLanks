$(document).ready(function()
{
    $("#easy_order").on('submit',{path: '/order?type=simple'}, send_form_data);
    $("#full_order").on('submit',{path: '/order?type=contract'}, send_form_data);
});