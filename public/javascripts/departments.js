$(document).ready(function() {

    var cities = {
        "Воронеж": ['Воронеж', "Белгород", "Липецк"],
        "Москва": ['Москва', 'Одинцово', 'Домодедово'],
        "Санкт-Петербург": ['Санкт-Петербург', "Петергоф", "Стрельна"]
    };

    $('#enterDepartment').find('input').on('keyup', function(event){
        console.log($(this).val());
        var departmentLinks = $('#departments_list').find('a');

        departmentLinks.hide();

        for (var i in cities) {
            for (var j = 0; j < cities[i].length; j++) {
                var regex = new RegExp($(this).val(),'i');
                if (cities[i][j].match(regex)){
                    console.log(cities[i][j]);
                    console.log(departmentLinks.find('strong:contains('+i+')').parent());
                    departmentLinks.find('strong:contains('+i+')').parent().show();
                }
            }
        }


    });
});