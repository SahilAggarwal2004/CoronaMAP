var list = [];
function updateMap() {
    fetch("./static/json/data.json") // fetch() function promises us to fetch data from either a file or a url
        .then(response => response.json()) // now json() function also returns a promise which resolves with the result of parsing the body text(here response) as json and thus we have to use another then which will execute as soon as it resolves its promise
        // even {} not needed in single-line arrow function
        .then(rsp => {
            // console.log(rsp.data); rsp(response) is an object containing data that is fetched using  fetch()
            rsp.data.forEach(element => {
                let cases = element.infected;
                list.push(cases);
            });

            const max = Math.max(...list)

            rsp.data.forEach(element => {
                let latitude = element.latitude;
                let longitude = element.longitude;
                let cases = element.infected;

                new mapboxgl.Marker({ // marker explained below
                    draggable: false,
                    color: `rgb(${cases * 255 / max * 100}, ${255 - cases * 255 / max * 100}, 0)` // marker colour - same as in css but in "color".
                })
                    .setLngLat([longitude, latitude])
                    .addTo(map)
                // We can mark latitude and longitude on the map using following code
            });
        })
}

updateMap();
setInterval(() => {
    updateMap();
    console.log('Data Updated!');
}, 60000);


// Our Map is blitting in div#id using this script


// Map Object
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FoaWxhZ2dhcndhbDIwMDQiLCJhIjoiY2t2bmU5a3JuZHkyMDJxcTZjcTV2ZXl3MSJ9.xldUJNfOX8b2fIvqs83W0Q';
const map = new mapboxgl.Map({
    container: 'map', // container ID (tag in which map is to be blitted)
    // style URL (map design): we can have different themes of map using url
    style: 'mapbox://styles/mapbox/streets-v11', // streets-v11 is a theme(style)
    // style: 'mapbox://styles/mapbox/dark-v10', (dark-v10 is also a theme)
    center: [45, 28.644800], // starting position [lng, lat] (location)
    zoom: 1 // starting zoom (map zoom)
});

// Disable zoom by scroll
// map.scrollZoom.disable()

// Adding marker to the map
let marker = new mapboxgl.Marker({
    draggable: true // draggable using mouse(true) or not(false)
})
    .setLngLat([-10, -25]) // setting marker location
    .addTo(map) // adding marker to map(defined above)
// new mapboxgl.Marker({}).setLngLat([]).addTo() We could also execute this without storing the marker in a variable

// function to execute changes when marker is dragged
function onDrag() {
    let lngLat = marker.getLngLat(); // getting longitude and latitude(in an object) of new position of marker
    coordinates.innerHTML = `<p>Longitude: ${lngLat.lng}</p><p>Latitude: ${lngLat.lat}</p>`;
}

marker.on('drag', onDrag); // event-listener of another type. element(js object).on('event', function to be executed). More of this discussed in WhatsApp/server/server.js

// Only marker at [-10,-25] colored blue is draggable.