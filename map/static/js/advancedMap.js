// Creating map object
var myMap = L.map("map", {
  center: [33.7490, -84.3880],
  zoom: 11
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Use this link to get the geojson data.
  // var link = "static/data/atlanta.geojson";
  var link = "static/data/smaller_map.geojson"


// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: () => {
      return {
        color: "white",
        fillColor: "pink",
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.ZipCode + "</h1> <hr> <h2>" + feature.properties.name + "</h2>");

    }
  }).addTo(myMap);
});
// 
var link = "static/data/crime_data.csv"

d3.csv(link, function(crimes) {
  
    var heatArray = [];
  
    for (var i = 0; i < crimes.length; i++) {
        // var lat = crimes[i].Latitude;
        // var lng = crimes[i].Longitude;

      if (crimes[i]) {
        heatArray.push([crimes[i].Latitude, [crimes[i].Longitude]]);
      }
    }
  
    var heat = L.heatLayer(heatArray, {
      radius: 20, 
      blur: 35
    }).addTo(myMap);
  
  });
  const fetchSchools2 = () => {
    pages = [1, 2, 3, 4, 5]
    let promises = []
    pages.forEach((page) => {
        url = `https://api.schooldigger.com/v1.2/schools?st=GA&city=Atlanta&page=${page}&perPage=50&appID=1a0adc5f&appKey=${SCHOOL_KEY}`
        promises.push(fetch(url).then(resp => resp.json()))
    })
    Promise.all(promises)
      //  map loading... 
    .then(filterData)
}

// var edData
const filterData = (data) => {
    // let masterSchoolList = data.map(datum => datum.schoolList)
    var masterSchoolList = []
    data.forEach((datum) => {
        masterSchoolList = [...masterSchoolList, ...datum.schoolList]
    })
    buildEdLayer(masterSchoolList)
    // edData = masterSchoolList
}

const buildEdLayer = (edData) => {
  let edMarkers = L.markerClusterGroup();
    edData.forEach((school, i) => {
        if (school.address.latLong.latitude && school.address.latLong.longitude) {
            let ed_lat = school.address.latLong.latitude; 
            let ed_lng = school.address.latLong.longitude;
            // console.log(i)
            edMarkers.addLayer(L.marker([ed_lat, ed_lng])
              .bindPopup(school.schoolName));
            // L.marker([ed_lat, ed_lng]).bindPopup(school.schoolName).addTo(myMap);
        }
      })
    // Add our marker cluster layer to the map
    // console.log("here")
    myMap.addLayer(edMarkers);
}

fetchSchools2()


























// const fetchSchools = () => {
//   var template = '{"schools":[' +
//   ']}';
//   var data = JSON.parse(template);
//   pages = [1, 2, 3, 4, 5]
//   var result
//   pages.forEach((page) => {
//       url = `https://api.schooldigger.com/v1.2/schools?st=GA&city=Atlanta&page=${page}&perPage=50&appID=1a0adc5f&appKey=${SCHOOL_KEY}`
//       fetch(url)
//       .then(response => response.json())
//       .then((jData => {
//           // console.log(jData)
//           result = jData
//           result.schoolList.forEach((school, i) => {
//               //parse the JSON
//               data.schools.push(school)
//               // console.log(school)


//               // SOLUTION
//               // check to see if in map already, if so, don't add


//               if (school.address) {
//                   let ed_lat = school.address.latLong.latitude;
//                   let ed_lng = school.address.latLong.longitude;
//                   // L.marker([ed_lat, ed_lng]).addTo(myMap);
//                   L.marker([ed_lat, ed_lng]).bindPopup(school.schoolName).addTo(myMap);
//                   // console.log(`School ${i} did have address`)
//                   }
//               else {
//                 // console.log(`School ${i} did not have address`)
//               }
//           })
//       }))
//       .catch(err => (console.log(err)))
//   })
//   return data
// }
// data = fetchSchools()

































// console.log(data.length)
// for (var i = 0; i < data.schools.length; i++) {
//   if (data.schools[i].address) {
//       var ed_lat = data.schools[i].address.latLong.latitude;
//       var ed_lng = data.schools[i].address.latLong.longitude;
//       console.log(`School ${i} did have address`)
//   }
//   else {console.log(`School ${i} did not have address`)}
//   // var ranking
//   var type = data.schools[i].schoolLevel
//   L.marker([ed_lat, ed_lng]).addTo(myMap);
// }

// import schooFetch from "./schooldiggerFetch.js"
// schoolData = schooFetch()
// console.log(schoolData)


// DEBUG WITH CLINTTTTTT !!!!!!! ALL OF THE LAYERS ARE CRASHING MY COMP
