
const zipComp = () => {

// // function init() {
//   d3.json("samples.json").then(importedData => {
//     data = importedData;
//   // this code will init the dropdown menu
//   var zips = mapData;
//   var dropdownMenu = d3.select("#selDataset");
//   subjectIDs.forEach(ID => dropdownMenu.append("option").text(ID));
//   // should equal current option selected in the dropdown
//   var subjectid = dropdownMenu.property("selectedIndex");
//   init()
//   // }
// // Code works great up to this point
// // Display the default plot
// function init() {
//   buildCharts(data, 0)
// }

//   // Use D3 fetch to read the JSON file
//   // The data from the JSON file is arbitrarily named importedData as the argument
//   function buildCharts(zip) {
//     // d3.json("/samples.json").then(importedData => {
//     //     var data = importedData;
//         // This code block will grab all the relevant values for each name
//         var sampleData = data.samples[subjectid]; // where subject id is the id key to the subject's sample data
//         // Grab the first 10 objects for plotting
//         var values = sampleData.sample_values.slice(0,OTUs_toDisplay);
//         var ids = sampleData.otu_ids.slice(0, OTUs_toDisplay).map(id => "OTU ID:" + id.toString());
//         var labels = sampleData.otu_labels.slice(0,OTUs_toDisplay);
//         // bar chart setup
//         var data_bar = [{
//           x: values,
//           y: ids,
//           text: labels,
//           name: "Top ten OTUs by individual",
//           type: "bar",
//           orientation: "h"
//       }];
//       var layout_bar = {
//         title: 'Bar Chart',
//         showlegend: false,
//         height: 600,
//         width: 600
//       };
//         Plotly.newPlot("bar", data_bar, layout_bar);
//         // bubble chart setup
//         var data_bubble = [{
//           x: ids,
//           y: values,
//           text: labels,
//           mode: 'markers',
//           marker: {
//             size: values,
//             color: values,
//             colorscale: [[0, 'rgb(200, 255, 200)'], [300, 'rgb(0, 100, 0)']],
//             cmin: 0,
//             cmax: 300,
//           }
//         }];
//         var layout_bubble = {
//           title: 'Bubble Chart',
//           showlegend: false,
//           height: 600,
//           width: 600
//         };
//         Plotly.newPlot('bubble', data_bubble, layout_bubble);
//     // });
//   };


//  // On change to the DOM, call getData()
// d3.selectAll("#selDataset").on("change", optionChanged);
//   function optionChanged() {
//     dropdownMenu = d3.select("#selDataset");
//     subjectid = dropdownMenu.property("selectedIndex");
//     buildCharts(zip)
//   };
// });
}
zipComp()