$(document).ready(function() {
    var mode = 'departmentsOnly';
    var departmentInfo = $('.departmentInfo');
    var cities = {};

    departmentInfo.find('.departmentSatellites').each(function(index, elem){
        cities[$(elem).prev().find('strong').text()] = ($(elem).text()).split(': ')[1].split(', ');
    });

    $('#modeSwitcher').on('click', function(){
        if (mode === 'departmentsOnly') {
            mode = 'all';
            $('#modeSwitcher').text('Показывать только филиалы');
            $('.departmentSatellites').show();
            departmentInfo.removeClass('displayInlineBlock');
            departmentInfo.each(function(index, elem){
                if (!$(elem).hasClass('hiddenDepartment'))
                    $(elem).addClass('displayBlock');
            });
            departmentInfo.find('a').css('float', 'left');
        } else {
            mode = 'departmentsOnly';
            $('#modeSwitcher').text('Показывать все города');
            $('.departmentSatellites').hide();
            departmentInfo.removeClass('displayBlock');
            departmentInfo.each(function(index, elem){
                if (!$(elem).hasClass('hiddenDepartment'))
                    $(elem).addClass('displayInlineBlock');
            });
            departmentInfo.find('a').css('float', 'none');
        }
    });

    $('#enterDepartment').find('input').on('keyup', function(event){
        var departmentInfo = $('.departmentInfo');
        var regex = new RegExp($(this).val(),'i');
        var foundInCities = [];
        departmentInfo.addClass('hiddenDepartment');

        for (var i in cities) {
            for (var j = 0; j < cities[i].length; j++) {
                if (cities[i][j].match(regex)){
                    if (foundInCities.indexOf(i) === -1)
                        foundInCities.push(i);
                }
            }
        }
        for (var k = 0; k < foundInCities.length; k++) {
            var correctDepartment = departmentInfo.find('strong:contains('+foundInCities[k]+')').parent().parent();
            correctDepartment.removeClass('hiddenDepartment');
        }
    });
});