let map;

function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 38.7223, lng: -9.1393 },
        zoom: 8,
    });
}
