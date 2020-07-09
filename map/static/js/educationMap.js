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

const buildSchoolLayer = () => {
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
        console.log(masterSchoolList)
        buildEdLayer(masterSchoolList)
        // edData = masterSchoolList
    }

    const buildEdLayer = (edData) => {
    let edMarkers = L.markerClusterGroup();
        edData.forEach((school, i) => {
            if (school.address.latLong.latitude && school.address.latLong.longitude) {
                let ed_lat = school.address.latLong.latitude; 
                let ed_lng = school.address.latLong.longitude;
                let rank = "N/A"
                for (i=0;i<schoolDataList.length; i++) {
                    if (schoolDataList[i].schoolName == school.schoolName) {
                        rank = schoolDataList[i].rank
                        break
                    }
                    else 
                        {continue}
                }
                // let rank = "A+"
                let type = school.schoolLevel;
                // console.log(i)   
                edMarkers.addLayer(L.marker([ed_lat, ed_lng])
                .bindPopup("School Name:" + school.schoolName + "<br>Ranking:" + rank + "<br>School Type:" + type));
                // L.marker([ed_lat, ed_lng]).bindPopup(school.schoolName).addTo(myMap);
            //     layer.bindPopup("Zip Code: " + feature.properties.ZipCode + "<br>Median Listing Price:<br>" +
            // "$" + feature.properties.MedianListingPrice);
            }
        })
        // Add our marker cluster layer to the map
        // console.log("here")
        myMap.addLayer(edMarkers);
    }
    fetchSchools2()
}
buildSchoolLayer()





// const fetchSchools = () => {
//     var template = '{"schools":[' +
//     ']}';
//     var data = JSON.parse(template);
//     pages = [1, 2, 3, 4, 5]
//     var result
//     pages.forEach((page) => {
//         url = `https://api.schooldigger.com/v1.2/schools?st=GA&city=Atlanta&page=${page}&perPage=50&appID=1a0adc5f&appKey=${SCHOOL_KEY}`
//         fetch(url)
//         .then(response => response.json())
//         .then((jData => {
//             // console.log(jData)
//             result = jData
//             result.schoolList.forEach((school) => {
//                 //parse the JSON
//                 data.schools.push(school)
//                 // let ed_lat = school.address.latLong.latitude; 
//                 // let ed_lng = school.address.latLong.longitude;
//                 // L.marker([ed_lat, ed_lng]).addTo(myMap);
//             })
//         }))
//         .catch(err => (console.log(err)))
//     })
//     return data
// }
// data = fetchSchools()

// const fetchSchools2 = () => {
//     var template = '{"schools":[' +
//     ']}';
//     var data = JSON.parse(template);
//     // pages = [1, 2, 3, 4, 5]
//     // var result
//     pages.forEach((page) => {
//         url = `https://api.schooldigger.com/v1.2/schools?st=GA&city=Atlanta&page=${page}&perPage=50&appID=1a0adc5f&appKey=${SCHOOL_KEY}`
//         fetch(url)
//         .then(response => {
//             return response.json()
//         }
//         .catch(err => console.log(err))
//         )}}
//     return data
// }


// var link = "static/data/crime_data.csv"

// d3.csv(link, function(crime) {

//   console.log(crime);

//   for (var i = 0; i < crime.length; i++) {
//     var lat = crime[i].Latitude;
//     var lng = crime[i].Longitude;
//     L.marker([lat, lng]).addTo(myMap);
//   }

// });

// data = fetchSchools()
// console.log(data)


// ONLY adds first 125, then stops. debug with clint in the morning
//  also figure out how to get this to run automatically, definitely has to do with promise
// for (var i = 0; i < data.schools.length; i++) {
//     if (data.schools[i].address) {
//         var ed_lat = data.schools[i].address.latLong.latitude;
//         var ed_lng = data.schools[i].address.latLong.longitude;
//         console.log(`School ${i} did have address`)
//     }
//     else {console.log(`School ${i} did not have address`)}
//     // var ranking
//     var type = data.schools[i].schoolLevel
//     L.marker([ed_lat, ed_lng]).addTo(myMap);
//   }
// add event listener to each marker