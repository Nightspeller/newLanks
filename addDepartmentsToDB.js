var Departments = require('./modelsDB/departments').Departments;

var departments_data = [
    {"number":"0","name":"Волгоград","gerb":"volgograd","index":"400075","street":"Серийный Проезд","house":"5","office":"-","e_mail":"lanks.volgograd@mail.ru","phone":"+7 (8442) 58-03-95","fax":"+7(8442) 58-03-95","additional_phone":" ","skype":"antipina_u","street_stock":"Серийный Проезд","building":"5","place":"-","phone_stock":"+7 (8442) 58-03-95","coordinates":"48.756396,44.474805","map_id":"ymaps-map-id_134705026278533542022"},
    {"number":"1","name":"Воронеж","gerb":"vrn","index":"394063","street":"25 Января","house":"14a","office":"8","e_mail":"andreev@lanks.org,sidorov@lanks.org","phone":"+7(473)261-22-11","fax":"+7(473)261-22-86","additional_phone":"+7(473)261-21-86,+7(473)261-21-87","skype":"lanks.sidorov","street_stock":"ул.Витрука","building":"14в","place":"","phone_stock":"+7(473)291-63-49","coordinates":"51.739679,39.302731","map_id":"ymaps-map-id_134705026278533542022"},
    {"number":"2","name":"Екатеринбург","gerb":"ekat","index":"620017","street":"космонавтов","house":"11/Б","office":"-","e_mail":"ekat@lanks.org, krukovskiy@lanks.org","phone":"+7 (343) 331-99-67 ","fax":"+7 (343) 331-99-67 ","additional_phone":"+7 (343) 331-99-67","skype":"nataly26213","street_stock":"Космонавтов","building":"11/Б","place":"-","phone_stock":"+7 (343) 331-99-67 ","coordinates":"56.868768,60.612051","map_id":"ymaps-map-id_134867117773098623220"},
    {"number":"3","name":"Краснодар","gerb":"krasnodar","index":"350072","street":"Ростовское шоссе","house":"14/2","office":"-","e_mail":"lanks_krd@mail.ru, aksenov@lanks.org","phone":"8 988 240 81 35","fax":"+7 (861) 240 81 35","additional_phone":"8 861 240 81 35","skype":"sergei220570","street_stock":"Сормовская","building":"7","place":" ","phone_stock":"+7(861)2109565","coordinates":"45.024368,39.065193","map_id":"ymaps-map-id_134867239529152282539"},
    {"number":"4","name":"Красноярск","gerb":"krasnoyarsk","index":"660118","street":"Енисейский тракт","house":"5","office":"-","e_mail":"krasnoyarsk@lanks.org","phone":"+7 (913) 175-64-21","fax":" ","additional_phone":"+7 (913) 175-64-21 ","skype":"a0609071","street_stock":"-","building":"-","place":"-","phone_stock":"-","coordinates":"56.080784,92.922247","map_id":"ymaps-map-id_134867305168391682447"},
    {"number":"5","name":"Москва","gerb":"moscow","index":"143005","street":"Транспортная","house":"5","office":" ","e_mail":"office.msk@lanks.org","phone":"+7 (495) 591-71-48","fax":"+7 (495) 591-71-48","additional_phone":" ","skype":"hranina_olesya","street_stock":"Транспортная ","building":"5 ","place":"-","phone_stock":"+7 (495) 591-71-48","coordinates":"55.677638,37.297896","map_id":"ymaps-map-id_134876127752061982428"},
    {"number":"6","name":"Нижний Новгород","gerb":"nn","index":"603074","street":"Совхозная","house":"9Б","office":"23","e_mail":"office.nn@lanks.org","phone":"+7 (831) 241-97-35","fax":"+7 (831) 241-97-56","additional_phone":"+7 (312) 41-97-56 ","skype":"nastina_marina","street_stock":"Совхозная","building":"9Б","place":"-","phone_stock":"+7 (312)41-97-35","coordinates":"43.907702,56.330570","map_id":"ymaps-map-id_134867381238981752407"},
    {"number":"7","name":"Новосибирск","gerb":"novosib","index":"630088","street":"ул. Петухова","house":"16/1","office":"2/3","e_mail":"sampetov.lanks@mail.ru, novosibirsk@lanks.org","phone":"+7(383) 342-10-98","fax":" ","additional_phone":"913-925-54-58","skype":"cfvgtnjd1","street_stock":"ул.Троллейная","building":"87","place":"Склад 7,8","phone_stock":"+7 (983)-301-52-31","coordinates":"82.858562,54.980221","map_id":"ymaps-map-id_134867391618188711886"},
    {"number":"8","name":"Оренбург","gerb":"orenburg","index":"460000","street":"ул. Мусы Джалиля","house":"6","office":"-","e_mail":"orenburg@lanks.org , lanks.ornb@mail.ru","phone":"+7 (3532) 98-57-24","fax":"(3532) 98-57-24, (3532) 98-57-26","additional_phone":"+7 (3532) 98-57-26","skype":"zharkova056","street_stock":"ул. Мусы Джалиля","building":"6","place":"-","phone_stock":"+7 (3532) 98-57-26","coordinates":" 55.073975,51.764685","map_id":"ymaps-map-id_134867468919171611524"},
    {"number":"9","name":"Пермь","gerb":"perm","index":"614033 ","street":" Васильева","house":"9","office":"15","e_mail":"lanks.perm@mail.ru","phone":"+7 (342) 20-65-626 ","fax":"+7 (342) 20-65-626","additional_phone":" , +7 (342) 227-57-53","skype":"lankspermmanager","street_stock":"Васильева","building":"9","place":"-","phone_stock":"+7 (342) 240-82-04","coordinates":"57.957496, 56.265793","map_id":"ymaps-map-id_134867525138926901536"},
    {"number":"10","name":"Ростов-На-Дону","gerb":"rnd","index":"344011","street":"ул. Филимоновская","house":"78","office":"-","e_mail":"rostov@lanks.org","phone":"+7 (863) 282-62-49","fax":"+7 (863) 282-62-49","additional_phone":"+7 (928) 279-71-83","skype":"marinalanks","street_stock":"ул.Механизаторов","building":"7","place":"-","phone_stock":"+7 (863) 282-62-49","coordinates":"39.699716, 47.228556","map_id":"ymaps-map-id_134875710778373671389"},
    {"number":"11","name":"Самара","gerb":"samara","index":"443022","street":"ул. Кабельная","house":"5","office":"-","e_mail":"samara@lanks.org","phone":"+7 (937) 18-32-661","fax":"+7 (846) 97-91-335","additional_phone":"+7 (846) 979-99-87","skype":"dolganova-lanks","street_stock":"ул.Кабельная","building":"5","place":"-","phone_stock":"+7 (846) 97-99-987","coordinates":"50.266857,53.199182","map_id":"ymaps-map-id_134875806127142031400"},
    {"number":"12","name":"Санкт-Петербург","gerb":"spb","index":"195027","street":"ул. Шаумяна","house":"4","office":"322","e_mail":"spb@lanks.org","phone":"+7 (812) 336-92-44","fax":"+7 (812) 336-92-43","additional_phone":"+8 (812) 929-20-31","skype":"lanks_perevozchik_spb","street_stock":"ул.Партизанская","building":"25","place":"второй проезд налево,второй терминал-склад","phone_stock":"+7 (812) 336-92-44 ","coordinates":"30.44391,59.946759","map_id":"ymaps-map-id_13487600333152801469"},
    {"number":"13","name":"Саратов","gerb":"saratov","index":"410052","street":"пр-т 50-летия Октября","house":"128а","office":"204, 205а","e_mail":"saratov@lanks.org","phone":"+7 (8452) 35-12-81","fax":"+7 (8452) 35-12-81","additional_phone":"+7 (8452)34-38-14","skype":"s3512818","street_stock":"Сокурский тракт","building":"-","place":"Территория складов Технониколь","phone_stock":"+7 (8452)34-38-14","coordinates":"45.963453,51.618163","map_id":"ymaps-map-id_134875817639953381751"},
    {"number":"14","name":"Серпухов","gerb":"serpukhov","index":"-","street":"-","house":"-","office":"-","e_mail":"lanks.serpuhov@mail.ru","phone":"+7 (926)-739-41-408","fax":"-","additional_phone":"-","skype":"alesya9335","street_stock":"-","building":"-","place":"-","phone_stock":"","coordinates":"-","map_id":"ymaps-map-id_134876127752061982428"},
    {"number":"15","name":"Тольятти","gerb":"toljatti","index":"-","street":"-","house":"-","office":"-","e_mail":"-","phone":"+7 (903) 331-51-13 ","fax":"-","additional_phone":"-","skype":"xdzzzrx","street_stock":"ул.Ботаническая","building":"20","place":" ","phone_stock":"","coordinates":"49.299704,53.544639","map_id":"ymaps-map-id_134875869784235841402"},
    {"number":"16","name":"Минск","gerb":"minsk","index":"220114","street":"Скорины","house":"14","office":"201","e_mail":"-","phone":"+375172688396","fax":"-","additional_phone":"-","skype":"iliya_lanksminsk","street_stock":"-","building":"-","place":"-","phone_stock":"-","coordinates":"27.670267,53.923053","map_id":"ymaps-map-id_136194907313680043367"},
    {"number":"17","name":"Челябинск","gerb":"chelyabinsk","index":"454048","street":"ул. Радонежская","house":"6","office":"-","e_mail":"chelyabinsk@lanks.org , lanks74@mail.ru","phone":"+7 (351) 200-41-71","fax":"(351) 200-41-71","additional_phone":"-","skype":"oolga5","street_stock":"ул. Радонежская","building":"6","place":"-","phone_stock":"(351) 200-41-71","coordinates":"61.367528, 55.225447","map_id":"ymaps-map-id_134875970113952281372"},
    {"number":"18","name":"Казань","gerb":"kazan","index":"420073","street":" ул. Седова","house":"2","office":"-","e_mail":"kazan@lanks.org","phone":"+7 (962) 563-91-15","fax":"-","additional_phone":"-","skype":"-","street_stock":"ул. Седова","building":"2","place":"-","phone_stock":"+7 (962) 563-91-15","coordinates":"55.78359478, 49.17773150","map_id":"ymaps-map-id_134875970113952281374"}
];

for (var i = 0; i < departments_data.length; i++) {
    for (var j in departments_data[i]){
        if(departments_data[i][j] === '-') departments_data[i][j] = "";
    }

    var departmentObj = { index:  departments_data[i].number,
        city: departments_data[i].name,
        cityEng: departments_data[i].gerb,
        address:  departments_data[i].index+' '+departments_data[i].street+' '+departments_data[i].house+' '+departments_data[i].office,
        email:  departments_data[i].e_mail,
        mainPhone: departments_data[i].phone,
        additionalPhone: departments_data[i].additional_phone,
        fax: departments_data[i].fax,
        skype: departments_data[i].skype,
        stockAddress:  departments_data[i].street_stock+' '+departments_data[i].building+' '+departments_data[i].place,
        coordinates: departments_data[i].coordinates,
        mapID: departments_data[i].map_id
    };

    var newDepartment = new Departments(departmentObj);
    newDepartment.save(function(err){
        if(err) throw err;
    });
}
