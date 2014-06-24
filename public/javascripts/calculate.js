$(document).ready(function()
{
    var inp_count = 0;// переменная для хранения количества полей параметров груза

    function send_ajax_request(total_weight,k){
		var cargo_data = $("#select1").val()+';'+$("#select2").val()+';'+total_weight;
		$("#output1").html("<h1>Идет расчет стоимости</h1>");
		$.post(
			"wsgi/.calc_script.wsgi",
			cargo_data,
			onAjaxCargoSuccess
		);
		function onAjaxCargoSuccess(data)
		{
			data = data.split(";");
			var price_per_kg=data[0];			
			var price=total_weight*price_per_kg*Math.max.apply({},k);
			if (price<300) price=300;
			if ($("#insurance_sum").val() != '') {
				price+=$("#insurance_sum").val()*0.02;
			}
			var text_result = "";
			text_result+="Наценка за негабарит:"+Math.max.apply({},k)+ '<br>' +
				"Цена за кг:" + price_per_kg+' руб.<br>'+
				"Рассчитанный общий вес:" + total_weight +' кг.<br>'+
				"Страховка: " + $("#insurance_sum").val()*0.02 + ' руб.<br>' +
				"Цена: " + price + ' руб.<br>';
				
			if ($("#pickup").is(':checked')) {
				text_result+="Стоимость забора груза: "+data[1]+' руб.<br />Цена за км при выезде за город: '+data[2]+' руб.<br />';
			}
			if ($("#deliver").is(':checked')) {
				text_result+="Стоимость доставки груза: "+data[3]+' руб.<br />Цена за км при выезде за город: '+data[4]+' руб.<br />';
			}
			if ($("#plomba").is(':checked')) {
				text_result+="Цена пломбы 20р,<br> мешка 40р,<br> большего мешка 60р. <br>"
			}
			if ($("#pallet").is(':checked')) {
				text_result+="150 руб/м3, поддон 100 руб <br>"
			}
			if ($("#hard_pack").is(':checked')) {
				text_result+="500 руб/м3 <br>"
			}
			$("#output1").html(text_result);
		}
	}
	
	
	$("#calc").click( function () {
        if (!invalidate_form()) {        //приверяем введены ли элементы
            var k=new Array();
            var total_weight=0;

            for (var i=0; i<inp_count;i++) {
                var length=$("#length"+i).val();
                var height=$("#height"+i).val();
                var width=$("#width"+i).val();
                var weight=$("#weight"+i).val();
                var volume=0;
                k[i]=1;
                if ((length*1+height*1+width*1)>=4) {k[i]=1.1};
                if ((length*1+height*1+width*1)>=5) {k[i]=1.25};
                if ((length*1+height*1+width*1)>=6) {k[i]=1.5};
                if ((length*1+height*1+width*1)>=9) {k[i]=1.75};
                if ((length*1+height*1+width*1)>=12) {k[i]=1.9};
                if ((weight>700)&&(weight<=1000))  {k[i]=k[i]*1.1};
                if ((weight>1000)&&(weight<=1500)) {k[i]=k[i]*1.2};
                if ((weight>1500)&&(weight<=2000)) {k[i]=k[i]*1.3};
                if (weight>2000) {k[i]=k[i]*1.5};

                if ($("#volume"+i).val() != '') {
                    volume=$("#volume"+i).val();
                }else {
                    volume=length*height*width;
                }
                if (volume*210 > weight) {
                    weight = volume*210;
                };
                total_weight+=weight*1;
            };
			
			//бросаем вес и пункты отправления и назначения на сервер, получаем цену за кг
			if (total_weight<5000) {
				send_ajax_request(total_weight,k);
			} else {
				$("#output1").html("Груз с данными параметрами<br /> подпадает под действие<br /> индивидуалных предложений!<br /> Пожалуйста, <a href='question'>свяжитесь с оператором!</a>");
			}			
		}
    });

    $("#add_input").click(function(){
		$('#inputi').append('<div><div class="table">' +
            '<div>' +
            '<div>' +
            '<label for="places'+inp_count+'">Количество мест</label>' +
            '</div>' +
            '<div>' +
            '<label for="weight'+inp_count+'">Вес</label>' +
            '</div>' +
            '<div>' +
            '<label>Задать размер</label><input type="radio" name="vol_or_dim'+inp_count+'" id="radio1"' +
            ' >' +
            '</div>' +
            '<div>' +
            '<label for="length'+inp_count+'">Длина </label>' +
            '</div>' +
            '<div>' +
            '<label for="width'+inp_count+'">Ширина</label>' +
            '</div>' +
            '<div>' +
            '<label for="height'+inp_count+'">Высота</label>' +
            '</div>' +
            '<div>' +
            '<label for="volume'+inp_count+'">Объем </label>' +
            '</div>' +
            '<div>' +
            '<label for="addition'+inp_count+'">Упаковка</label>' +
            '</div>' +
            '</div>' +
            '<div>' +
            '<div>' +
            '<input type="number" id="places'+inp_count+'" size="4" min="1" >' +
            '</div>' +
            '<div>' +
            '<input type="number" id="weight'+inp_count+'" size="5" min="0.1">' +
            '</div>' +
            '<div>' +
            '<label>Задать объем </label><input type="radio" name="vol_or_dim'+inp_count+'" id="radio2"' +
            ' >' +
            '</div>' +
            '<div>' +
            '<input type="number" id="length'+inp_count+'" size="2" min="0.01" disabled>' +
            '</div>' +
            '<div>' +
            '<input type="number" id="width'+inp_count+'" size="2" min="0.01" disabled>' +
            '</div>' +
            '<div>' +
            '<input type="number" id="height'+inp_count+'" size="2" min="0.01" disabled>' +
            '</div>' +
            '<div>' +
            '<input type="number" id="volume'+inp_count+'" size="2" min="0.01" disabled>' +
            '</div>' +
            '<div>' +
            '<input type="checkbox" id="addition'+inp_count+'">' +
            '</div>' +
            '</div>' +
            '<div id="add_row'+inp_count+'" style="display: none;"">' +
            '<div>' +
            '<label for="stretch'+inp_count+'">Пленка</label><input type="checkbox" id="stretch'+inp_count+'">' +
            '</div>' +
            '<div>' +
            '<label for="hard'+inp_count+'">Жесткая<br> упаковка</label><input type="checkbox" id="hard'+inp_count+'">' +
            '</div>' +
            '<div>' +
            '<label for="lathing'+inp_count+'">Обрешетка</label><input type="checkbox" id="lathing'+inp_count+'">' +
            '</div>' +
            '<div>' +
            '<label for="paperboard'+inp_count+'">Картон</label><input type="checkbox" id="paperboard'+inp_count+'">' +
            '</div>' +
            '<div>' +
            '<label for="seal'+inp_count+'">Пломбировка</label><input type="checkbox" id="seal'+inp_count+'">' +
            '</div>' +
            '<div>' +
            '<label for="pallet'+inp_count+'">Паллетирование</label><input type="checkbox" id="pallet'+inp_count+'">' +
            '</div>' +
            '<div>' +
            '<label for="bubble'+inp_count+'">Пузырчатая<br> пленка</label><input type="checkbox" id="bubble'+inp_count+'">' +
            '</div>' +
            '<div>' +
            '<label for="terms'+inp_count+'">Сроки<br> доставки</label><input type="checkbox" id="terms'+inp_count+'">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<hr></div>');
		// Оживляем кнопки
        $("#addition"+inp_count).live('change', function(){
            if (this.checked) {
                $("#add_row"+this.id.charAt(this.id.length-1)).show();
            } else {
                $("#add_row"+this.id.charAt(this.id.length-1)).hide();
            }
        });
        inp_count++;
    });

    $("#del_input").click(function(){
		$('#inputi > div:last-child').remove();
        if (inp_count>0) {
			inp_count--;
        }
    });

    $("#select1").change(function() {
            $("#city_from").prop("src", "images/departments/"+$("#select1").val()+".png");
    });
    $("#select2").change(function() {
        $("#city_to").prop("src", "images/departments/"+$("#select2").val()+".png");
    });

    $("#pickup").change(function() {
        if (this.checked) {
            $("#arrow_from").prop("src", "images/calculate/arrow_from.png");
        } else {
            $("#arrow_from").prop("src", "images/calculate/deny_arrow_from.png");
        }
    });

    $("#deliver").change(function() {
        if (this.checked) {
            $("#arrow_to").prop("src", "images/calculate/arrow_to.png");
        } else {
            $("#arrow_to").prop("src", "images/calculate/deny_arrow_to.png");
        }
    });

    $("#insurance").change(function(){
        if (this.checked) {
            $("#insurance_sum").show();
            $("label[for='insurance_sum']").show();
            $("#umbrella").show();
        } else {
            $("#insurance_sum").val("");
            $("#insurance_sum").hide();
            $("label[for='insurance_sum']").hide();
            $("#umbrella").hide();
        }
    });

    $("#add_input").click();

    $(':radio').live ('click', function() {
        id = this.id;
        inp_counter = this.name.substring(this.name.length-1);
        if (id=='radio1') {
            $("#volume"+inp_counter).prop('disabled', true);
            $("#volume"+inp_counter).val('');
            $("#length"+inp_counter).prop('disabled', false);
            $("#width"+inp_counter).prop('disabled', false);
            $("#height"+inp_counter).prop('disabled', false);
        } else {
            $("#volume"+inp_counter).prop('disabled', false);
            $("#length"+inp_counter).prop('disabled', true);
            $("#length"+inp_counter).val('');
            $("#width"+inp_counter).prop('disabled', true);
            $("#width"+inp_counter).val('');
            $("#height"+inp_counter).prop('disabled', true);
            $("#height"+inp_counter).val('');
        };
    });
    function invalidate_form(){
        if(($("#select1").val() == "def") || ($("#select2").val() == "def")){alert("Введите пунты отправления и назначения"); return true}
        if($("#insurance_sum").val() < 0){alert("Введите сумму страховки"); return true};
        for (var i=0;i<inp_count;i++){
            if((($("#volume"+i).val() == "") && (($("#length"+i).val() == "") ||($("#height"+i).val() == "") || ($("#width"+i).val() == "") ))){alert("Введите правельные габариты груза"); return true}
            if($("#places"+i).val() < 1){alert("Введите правильное количество мест");return true};
            if($("#weight"+i).val() <= 0.01){alert("Введите правильный вес");return true};
            if(($("#length"+i).val() != "")&&($("#length"+i).val() <= 0.01)){alert("Введите правильную длину");return true};
            if(($("#height"+i).val() != "")&&($("#height"+i).val() <= 0.01)){alert("Введите правильную высоту");return true};
            if(($("#width"+i).val() != "")&&($("#width"+i).val() <= 0.01)){alert("Введите правильную ширину");return true};
            if(($("#volume"+i).val() != "")&&($("#volume"+i).val() <= 0.01)){alert("Введите правильный объем");return true};
        }
        return false;
    }
});