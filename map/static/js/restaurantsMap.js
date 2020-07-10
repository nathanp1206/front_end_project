// Create the tile layer that will be the background of our map
// var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "mapbox/streets-v11",
//   accessToken: API_KEY
// });

// // Initialize all of the LayerGroups we'll be using
// var layers = {
//     restaurants: new L.LayerGroup()
// };

// // Create the map with our layers
// var map = L.map("map-id", {
//   center: [40.73, -74.0059],
//   zoom: 12,
//   layers: [
//     layers.restaurants
//   ]
// });

// // Add our 'lightmap' tile layer to the map
// lightmap.addTo(map);

// // Create an overlays object to add to the layer control
// var overlays = {
//   "Restaurauts": layers.restaurants
// };

// // Create a control for our layers, add our overlay layers to it
// L.control.layers(null, overlays).addTo(map);

// // Create a legend to display information about our map
// var info = L.control({
//   position: "bottomright"
// });

// // When the layer control is added, insert a div with the class of "legend"
// info.onAdd = function() {
//   var div = L.DomUtil.create("div", "legend");
//   return div;
// };
// // Add the info legend to the map
// info.addTo(map);

// // Initialize an object containing icons for each layer group
// var icons = {
//     restaurants: L.ExtraMarkers.icon({
//     icon: "ion-settings",
//     iconColor: "white",
//     markerColor: "yellow",
//     shape: "star"
//   })
// };
var myHeaders = new Headers();
myHeaders.append("user-key", "3c7a19a78d878ca6c59b57c6356f8079");
myHeaders.append("Cookie", "csrf=e0c7a41a1be1813ae09a360d28ff880a; fbcity=1; zl=en; fbtrack=f0655d24fe51c0b33e9cc923addffec8; AWSALBTG=YE+F6XE+aO9TQs4LZXbFlHHSUWiYBmyyVfDquG5KCR5Gpez/YrwN++plV8CZJDCl/S5YOcJ5YqHilMGdO1CV2Ot3kJz4lLmHqwaaMb8htiL5qp6JEe1u/ADmemL20J7YU9kkrR/uGiDegUfOrGbB6Ygfq7pfSi/lWput0KEdBStkEnTJFE8=; AWSALBTGCORS=YE+F6XE+aO9TQs4LZXbFlHHSUWiYBmyyVfDquG5KCR5Gpez/YrwN++plV8CZJDCl/S5YOcJ5YqHilMGdO1CV2Ot3kJz4lLmHqwaaMb8htiL5qp6JEe1u/ADmemL20J7YU9kkrR/uGiDegUfOrGbB6Ygfq7pfSi/lWput0KEdBStkEnTJFE8=");
var urlencoded = new URLSearchParams();
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};
fetch("https://developers.zomato.com/api/v2.1/search?count=100&lat=33.7490&lon=-84.3880&radius=35&start=20", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


const fetchRestaurants = () => {
    fetch(proxy + "https://worldwide-restaurants.p.rapidapi.com/search", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    // .then(buildRLayer)
    .catch(error => console.log('error', error));
}
// const buildRLayer = (data) => {
//     let rMarkers = L.markerCluster
//     edData.forEach((restaurant, i) => {
//         if (restaurant.address.latLong.latitude && restaurant.address.latLong.longitude) {
//             let r_lat = restaurant.address.latLong.latitude; 
//             let r_lng = restaurant.address.latLong.longitude;
//             // console.log(i)
//             edMarkers.addLayer(L.marker([r_lat, r_lng])
//               .bindPopup(`${restaurant.name}: ${restaurant.rating}`));
//             // L.marker([ed_lat, ed_lng]).bindPopup(school.schoolName).addTo(myMap);
//         }
//       })
//     // Add our marker cluster layer to the map
//     // console.log("here")
//     myMap.addLayer(rMarkers);

// } 
// fetchRestaurants()



// // Perform an API call to the Citi Bike Station Information endpoint
// d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json", function(infoRes) {

//   // When the first API call is complete, perform another call to the Citi Bike Station Status endpoint
//   d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_status.json", function(statusRes) {
//     var updatedAt = infoRes.last_updated;
//     var stationStatus = statusRes.data.stations;
//     var stationInfo = infoRes.data.stations;

//     // Create an object to keep of the number of markers in each layer
//     var stationCount = {
//       COMING_SOON: 0,
//       EMPTY: 0,
//       LOW: 0,
//       NORMAL: 0,
//       OUT_OF_ORDER: 0
//     };

//     // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for layer group
//     var stationStatusCode;

//     // Loop through the stations (they're the same size and have partially matching data)
//     for (var i = 0; i < stationInfo.length; i++) {

//       // Create a new station object with properties of both station objects
//       var station = Object.assign({}, stationInfo[i], stationStatus[i]);
//       // If a station is listed but not installed, it's coming soon
//       if (!station.is_installed) {
//         stationStatusCode = "COMING_SOON";
//       }
//       // If a station has no bikes available, it's empty
//       else if (!station.num_bikes_available) {
//         stationStatusCode = "EMPTY";
//       }
//       // If a station is installed but isn't renting, it's out of order
//       else if (station.is_installed && !station.is_renting) {
//         stationStatusCode = "OUT_OF_ORDER";
//       }
//       // If a station has less than 5 bikes, it's status is low
//       else if (station.num_bikes_available < 5) {
//         stationStatusCode = "LOW";
//       }
//       // Otherwise the station is normal
//       else {
//         stationStatusCode = "NORMAL";
//       }

//       // Update the station count
//       stationCount[stationStatusCode]++;
//       // Create a new marker with the appropriate icon and coordinates
//       var newMarker = L.marker([station.lat, station.lon], {
//         icon: icons[stationStatusCode]
//       });

//       // Add the new marker to the appropriate layer
//       newMarker.addTo(layers[stationStatusCode]);

//       // Bind a popup to the marker that will  display on click. This will be rendered as HTML
//       newMarker.bindPopup(station.name + "<br> Capacity: " + station.capacity + "<br>" + station.num_bikes_available + " Bikes Available");
//     }

//     // Call the updateLegend function, which will... update the legend!
//     updateLegend(updatedAt, stationCount);
//   });
// });

// Update the legend's innerHTML with the last updated time and station count
// function updateLegend(time, rCount) {
//   document.querySelector(".legend").innerHTML = [
//     "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
//     "<p class='restaurants'>Restaurants: " + rCount.restaurants + "</p>",
//   ].join("");
// }
