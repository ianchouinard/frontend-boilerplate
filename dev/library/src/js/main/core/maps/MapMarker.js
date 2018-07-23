
export function MapMarker (model, map, bounds, onMarkerClick) {
    let marker = null;

    marker = new google.maps.Marker({
        position: new google.maps.LatLng(model.lat, model.long),
        map: map
    });

    bounds.extend(marker.position);

    let infowindow = new google.maps.InfoWindow({
        content: `
        <div class="info-window">
            <span>${model.name}</span>
            <br />
            <a target="_blank" href="https://www.google.com/maps/dir/current+location/${model.address}">Get Directions</a>
        </div>
        `
    });

    marker.addListener('click', () => {
        infowindow.open(map, marker);
        onMarkerClick(model, marker);
    });

    this.id = model.address;
    this.closeWindow = function () {
        infowindow.close();
    };
    this.openWindow = function () {
        infowindow.open(map, marker);
    };
}
