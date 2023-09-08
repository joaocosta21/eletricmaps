let map, directionsService, directionsRenderer;
let sourceAutocomplete, desAutocomplete

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 38.7223, lng: -9.1393 },
        zoom: 8,
    });

    google.maps.event.addListener(map, "click", function (event) {
        this.setOptions({ scrollwheel: true })
    })

    directionsService = new google.maps.DirectionsService()
    directionsRenderer = new google.maps.DirectionsRenderer()
    directionsRenderer.setMap(map)

    sourceAutocomplete = new google.maps.places.Autocomplete(
        document.getElementById('source')
    )
    desAutocomplete = new google.maps.places.Autocomplete(
        document.getElementById('dest')
    )

    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Location found.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                },
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation.",
    );
    infoWindow.open(map);
}

window.initMap = initMap;

