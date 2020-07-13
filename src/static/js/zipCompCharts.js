
data = localStorage.getItem("data")
mapData = JSON.parse(data)
// console.log(mapData) - WORKS!!!!
const zipComp = () => {

// function init() {
  // this code will init the dropdown menu
  var zips = mapData.map(zip => zip.zipCode)
  var dropdownMenu = d3.select("#selDataset");
  zips.forEach(ID => dropdownMenu.append("option").text(ID));
  // should equal current option selected in the dropdown
  let currZipIndex = dropdownMenu.property("selectedIndex");
  let currZip = zips[currZipIndex]

  var dropdownMenu2 = d3.select("#selDataset2");
  zips.forEach(ID => dropdownMenu2.append("option").text(ID));
  // should equal current option selected in the dropdown
  let currZipIndex2 = dropdownMenu2.property("selectedIndex");
  let currZip2 = zips[currZipIndex2]
  init()
  // }
// Code works great up to this point
// Display the default plot
    function init() {
    buildCharts(currZip)
    getDemographic(currZip)
    getDemographic2(currZip2)
    }

  // Use D3 fetch to read the JSON file
  // The data from the JSON file is arbitrarily named importedData as the argument
  function buildCharts(zip) {
    //     let zipData = mapData.filter(zip => zip.zipCode == currZip)[0];
    //     // let labels = ["A","B","C","D","N/A"];
    //     // let values = [];
    //     // var values = sampleData.sample_values.slice(0,OTUs_toDisplay);
    //     // var ids = sampleData.otu_ids.slice(0, OTUs_toDisplay).map(id => "OTU ID:" + id.toString());
    //     // bar chart setup
    //     var data_bar = [{
    //       x: values,
    //       y: ids,
    //       text: labels,
    //       name: `The schools of ${currZip}`,
    //       type: "bar"
    //     }];
    //   var layout_bar = {
    //     title: 'Bar Chart',
    //     showlegend: false,
    //     height: 600,
    //     width: 600
    //   };
        // Plotly.newPlot("bar", data_bar, layout_bar);
        // // bubble chart setup
        // var data_bubble = [{
        //   x: ids,
        //   y: values,
        //   text: labels,
        //   mode: 'markers',
        //   marker: {
        //     size: values,
        //     color: values,
        //     colorscale: [[0, 'rgb(200, 255, 200)'], [300, 'rgb(0, 100, 0)']],
        //     cmin: 0,
        //     cmax: 300,
        //   }
        // }];
        // var layout_bubble = {
        //   title: 'Bubble Chart',
        //   showlegend: false,
        //   height: 600,
        //   width: 600
        // };
        // Plotly.newPlot('bubble', data_bubble, layout_bubble);
    // });
    };
    function getDemographic(zip) {
        document.getElementById("sample-metadata").innerHTML = "";
        let currZip = mapData.filter(val => val.zipCode == zip)[0]
        console.log(currZip)
        let schoolInfo = "";
        if (currZip.schools.length == 0) {schoolInfo;} 
        else {schoolInfo = currZip.schools.map(school => `<div>${school.schoolName}: ${school.schoolLevel}</div>`).join("")}
        var demo = document.querySelector("#sample-metadata");
        // clear the html object
        demo.innerHTML = schoolInfo
    };
    function getDemographic2(zip) {
        document.getElementById("sample-metadata2").innerHTML = "";
        let currZip = mapData.filter(val => val.zipCode == zip)[0]
        console.log(currZip)
        let schoolInfo = "";
        if (currZip.schools.length == 0) {schoolInfo;} 
        else {schoolInfo = currZip.schools.map(school => `<div>${school.schoolName}: ${school.schoolLevel}</div>`).join("")}
        var demo = document.querySelector("#sample-metadata2");
        // clear the html object
        demo.innerHTML = schoolInfo
    };



        // On change to the DOM, call getData()
        d3.selectAll("#selDataset").on("change", optionChanged);
        function optionChanged(evt) {
            let dropdownMenu = document.querySelector("#selDataset")
            getDemographic(dropdownMenu.value)
        };
        d3.selectAll("#selDataset2").on("change", optionChanged2);
        function optionChanged2(evt) {
            let dropdownMenu2 = document.querySelector("#selDataset2")
            getDemographic2(dropdownMenu2.value)
        };
        }
zipComp()