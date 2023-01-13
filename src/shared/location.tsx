import { LatLngTuple } from 'leaflet'

const options: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

let latLng: LatLngTuple = [-23.618237, -46.635197]

function success(geoPosition: GeolocationPosition) {
    const geoCoordinates: GeolocationCoordinates = geoPosition.coords;
    latLng[0] = geoCoordinates.latitude;
    latLng[1] = geoCoordinates.longitude;

    console.log('Your current position is:');
    console.log(`Latitude : ${geoCoordinates.latitude}`);
    console.log(`Longitude: ${geoCoordinates.longitude}`);
    console.log(`More or less ${geoCoordinates.accuracy} meters.`);
}

function error(geoPositionError: GeolocationPositionError) {
    console.warn(`ERROR(${geoPositionError.code}): ${geoPositionError.message}`);
}

export function getActualLocation(): LatLngTuple {
    navigator.geolocation.getCurrentPosition(success, error, options);

    return latLng;
}