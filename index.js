var map;
function initMap () {
    $.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function(data) {
        var lat = data['iss_position']['latitude'];
        var lng = data['iss_position']['longitude'];

        document.getElementById('longitude').innerHTML = lng;
        document.getElementById('latitude').innerHTML = lat;



        map = new google.maps.Map(document.getElementById('map'), {
            // При создании объекта карты необходимо указать его свойства
            // center - определяем точку на которой карта будет центрироваться
            center: {lat: parseFloat(lat), lng: parseFloat(lng)},
            // zoom - определяет масштаб. 0 - видно всю платнеу. 18 - видно дома и улицы города.
            zoom: 3
        });
        var marker = new google.maps.Marker({
        // Определяем позицию маркера
            position: {lat: parseFloat(lat), lng: parseFloat(lng)},
        // Указываем на какой карте он должен появится. (На странице ведь может быть больше одной карты)
            map: map,
        // Пишем название маркера - появится если навести на него курсор и немного подождать
            title: 'Cleveroad'
         });
        // See leaflet docs for setting up icons and map layers
        // The update to the map is done here:       
    });
}
setInterval(initMap, 5000); 


function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}


function getCurrentDate () {
    var date = new Date;
    var days = ['Sonday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

    var currentDate = days[date.getUTCDay()] + ', ' + date.getUTCDate() + ' ' + months[date.getUTCMonth()] + ' ' + date.getUTCFullYear();
    var time = date.getUTCHours() + ':' +  addZero(date.getUTCMinutes());
    document.getElementById('time').innerHTML = time;
    document.getElementById('date').innerHTML = currentDate;

}
setInterval(getCurrentDate,1000);


function peopleAreInSpace () {
    $('#astronames').empty();
    $.getJSON('http://api.open-notify.org/astros.json', function(data) {
        var number = data['number'];
        $('#spacepeeps').html(number);
        data['people'].forEach(function (d) {
            $('#astronames').append('<li>' + d['name'] + '</li>');
        });
    });
}
peopleAreInSpace();
setInterval(peopleAreInSpace,5000);