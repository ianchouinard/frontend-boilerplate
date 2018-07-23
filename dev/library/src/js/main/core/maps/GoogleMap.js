/*
    :: Custom Google Map
*/

import { MapMarker } from './MapMarker';

export class GoogleMap {

    constructor(options) {
        this.locations = options.locations || [/* {address: string, name: string}*/];
        this.container = options.container || '#not_available';
        this.map = null;
        this.mapBounds = null;
        this.markers = [];
        this.styling = options.styling || false;
        this.onMarkerClick = options.onMarkerClick || function() {};
    }

    main() {
        this.container = document.querySelector(this.container);

        if (!this.container) {
            return;
        }

        this.mapBounds = new google.maps.LatLngBounds();

        this.map = new google.maps.Map(this.container, {
            disableDefaultUI: true,
            zoomControl: true,
            gestureHandling: 'cooperative',
            styles: this.styling
        });

        // Initialize google maps bounding box.
        let listener = google.maps.event.addListener(this.map, "idle", () => {
            this.map.fitBounds(this.mapBounds);
            if (this.map.getZoom() > 14) {
                this.map.setZoom(14);
                google.maps.event.removeListener(listener);
            }
        });

        for (let location of this.locations) {
            this.createMarkers(location);
        }
    }

    // Convert address string to lat long object
    createMarkers(location) {
        const geocoder = new google.maps.Geocoder();
        const geoModel = {
            'address': location.address
        };

        let marker;

        geocoder.geocode(geoModel, (results, status) => {
            if (status != google.maps.GeocoderStatus.OK) {
                console.warn(`Google maps Geocode: Can't convert ${location.address} to lat/lon: ${status}`);
                return;
            }

            // Using results create new instance of the MapMarker function
            // So click events and info can be retained in mem.
            marker = new MapMarker({
                name: location.name,
                address: location.address,
                lat: results[0].geometry.location.lat(),
                long: results[0].geometry.location.lng()
            }, this.map, this.mapBounds, this.onMarkerClick);
    
            this.markers.push(marker);
        });
    }

}
