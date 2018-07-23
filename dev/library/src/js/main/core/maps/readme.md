# ST Core Google Maps plguin
Small library for rendering custom google maps

## Code Overview
### GoogleMap.js
This class creates a new instance of the google maps api. 
Then passes the locations object through the google geocode api 
to get the latitude and longitude. Creates a new instance of the
MapMarker method and assings it to that map instance
### MapMarker.js
This method is used as the marker instance. It will place the marker on
the map, initialize the info popup, and assign the click handlers for 
each marker.

## Usage
```javascript
import { GoogleMap } from './codepath-to-st-core-library/maps/GoogleMap';

const initMap = () => {
    let map = new GoogleMap({
        locations: [
            {
                address: '680 Centre St. Brockton MA 02302',
                name: 'Signature Healthcare Brockton Hospital'
            },
            {
                address: '545 Bedford St. Bridgewater, MA',
                name: 'Other Location Name'
            }
        ],
        container: '#map-div',
        styling: [/* see google documentation on map styling*/],
        onMarkerClick: (location, marker) => {
            $( `[data-address=${location.address}]`).focus();
        }
    });

    map.main();
}

// <script src="...google-maps-api-link/apikey/callback=initMap" async defer></script>
```