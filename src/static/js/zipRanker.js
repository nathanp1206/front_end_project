// using the following global variables created from the loadData script
var mapData;
var test; // strictly for testing purposes

// array of objects: each zip code will be an object in the array
// key value pairs for the following: ed ranking, mlp ranking, crime ranking, combined ranking
const zipRanker = (preferences=0) => {
    // logic to pass in preferences. Preferences will be array, take xth element of array and pass to crimeRanker. function in this position for clarity, will move later.
    const crimeRanker = (preference=0) => {
        // crime... could be its own function
        let crimeCounts = []
        for (i=0; i<mapData.length;i++) {
            crimeCounts.push(mapData[i].crimes.length)
        };
        // console.log(crimeCounts)
        var sorted = crimeCounts.slice().sort(function(a,b){return b-a});
        var crimeRanks = crimeCounts.map(function(v){ return sorted.indexOf(v)+1 });
        // console.log(crimeRanks);
        var maxCrimeRank = Math.max.apply(Math, crimeRanks)
        // now that we have a ranking for each zipcode, make a case switch to apply the ranks to mapData
        for (i=0;i<mapData.length;i++) {
            switch(true) {
                case crimeRanks[i] < Math.floor(maxCrimeRank*.2):
                mapData[i]["crimeRank"] = "F"
                break;
                case crimeRanks[i] < Math.floor(maxCrimeRank*.4):
                mapData[i]["crimeRank"] = "D"
                break;
                case crimeRanks[i] < Math.floor(maxCrimeRank*.6):
                mapData[i]["crimeRank"] = "C"
                break;
                case crimeRanks[i] < Math.floor(maxCrimeRank*.8):
                mapData[i]["crimeRank"] = "B"
                break;
                case crimeRanks[i] < Math.floor(maxCrimeRank):
                mapData[i]["crimeRank"] = "A"
                break;
                default:
                    mapData[i]["crimeRank"] = "N/A"
            };
        };
    };
    crimeRanker()
    const edRanker = (preference=0) => {
        let schoolList = []
        for (i=0; i<mapData.length;i++) {
            schoolList.push(mapData[i].schools)
        };
        for (j=0;j<mapData.length;j++) {
            if (schoolList[j].length == 0) {mapData[j]["edRank"] = "N/A"}
            else {
                // AVERAGE the rankings
                let rankTotal = 0
                for (x=0;x<schoolList[j].length;x++) {
                    let targetName = schoolList[j][x].schoolName
                    let targetSchool = schoolDataList.filter(school => school.schoolName == targetName)
                    if (targetSchool.length == 0) {rank = "N/A"}
                    else {rank = targetSchool[0].rank}
                    // DEBUG, always defaults to 5
                    switch(true) {
                        case rank == "A+":
                        rankTotal+=10
                        break;
                        case rank == "A":
                        rankTotal+=9
                        break;
                        case rank == "A-":
                        rankTotal+=8
                        break;
                        case rank == "B+":
                        rankTotal+=7
                        break;
                        case rank == "B":
                        rankTotal+=6
                        break;
                        case rank == "B-":
                        rankTotal+=5
                        break;
                        case rank == "C+":
                        rankTotal+=4
                        break;
                        case rank == "C":
                        rankTotal+=3
                        break;
                        case rank == "C-":
                        rankTotal+=2
                        break;
                        case rank == "D+":
                        rankTotal+=1
                        break;
                        case rank == "D":
                        rankTotal+=0
                        break;
                        default:
                            rankTotal+=5
                    };
                };
                rankTotal = rankTotal/(schoolList[j].length-1)
                // console.log(rankTotal) DEBUG - the ed ranks generally work but some zipcodes have rankTotals higher than 10 which should be possible. because 
                // schools automatically given 5s for N/A but not dividing them by an adequately high number...
                // now that we have a average school rating for each zipcode, make a case switch to apply the ranks to mapData
                switch(true) {
                    case rankTotal >= 8:
                    mapData[j]["edRank"] = "A"
                    break;
                    case rankTotal >= 5:
                    mapData[j]["edRank"] = "B"
                    break;
                    case rankTotal >= 2:
                    mapData[j]["edRank"] = "C"
                    break;
                    case rankTotal >= 0:
                    mapData[j]["edRank"] = "D"
                    break;
                    default:
                        mapData[j]["edRank"] = "N/A"
                };
            }
        };
    };
    edRanker()
    const mlpRanker = (preference=0) => {
        // crime... could be its own function
        let mlps = []
        for (i=0; i<mapData.length;i++) {
            let num = mapData[i].medianListingPrice
            if (num > 0) {mlps.push(num)}
            else {mlps.push(-1)}
            };
        var sorted = mlps.slice().sort((a,b)=> b-a);
        var mlpRanks = mlps.map((v)=> sorted.indexOf(v)+1 );
        // console.log(crimeRanks);
        var maxMlpRank = Math.max.apply(Math, mlpRanks)
        // now that we have a ranking for each zipcode, make a case switch to apply the ranks to mapData
        for (i=0;i<mapData.length;i++) {
            switch(true) {
                case mlpRanks[i] < Math.floor(maxMlpRank*.2):
                mapData[i]["mlpRank"] = "F"
                break;
                case mlpRanks[i] < Math.floor(maxMlpRank*.4):
                mapData[i]["mlpRank"] = "D"
                break;
                case mlpRanks[i] < Math.floor(maxMlpRank*.6):
                mapData[i]["mlpRank"] = "C"
                break;
                case mlpRanks[i] < Math.floor(maxMlpRank*.8):
                mapData[i]["mlpRank"] = "B"
                break;
                case mlpRanks[i] < Math.floor(maxMlpRank):
                mapData[i]["mlpRank"] = "A"
                break;
                default:
                    mapData[i]["mlpRank"] = "N/A"
            };
        };
    };
    mlpRanker()
    const combinedRanker = () => {
        let ranks;
        for (i=0; i<mapData.length;i++) {
            if (mapData[i].mlpRank == "N/A" && mapData[i].edRank == "N/A" && mapData[i].crimeRank == "N/A") {mapData[i]["combinedRank"] = "N/A"}
            else {
                ranks = []
                ranks.push(mapData[i].crimeRank)
                ranks.push(mapData[i].edRank)
                ranks.push(mapData[i].mlpRank)
                // AVERAGE the rankings
                let rankTotal = 0
                for (j=0;j<ranks.length;j++) {
                    switch(true) {
                        case ranks[j] == "A":
                        rankTotal+=5
                        break;
                        case ranks[j] == "B":
                        rankTotal+=4
                        break;
                        case ranks[j] == "C":
                        rankTotal+=3
                        break;
                        case ranks[j] == "D":
                        rankTotal+=2
                        break;
                        case ranks[j] == "F":
                        rankTotal+=1
                        break;
                        default:
                            rankTotal+=2
                    };
                };
                validRankings = ranks.filter(rank => rank !== "N/A")
                rankTotal = rankTotal/(validRankings.length)
                switch(true) {
                    case rankTotal > 8:
                    mapData[i]["combinedRank"] = "A"
                    break;
                    case rankTotal > 4:
                    mapData[i]["combinedRank"] = "B"
                    break;
                    case rankTotal > 2:
                    mapData[i]["combinedRank"] = "C"
                    break;
                    case rankTotal > 1:
                    mapData[i]["combinedRank"] = "D"
                    break;
                    default:
                        mapData[i]["combinedRank"] = "F"
                };
            };
        };
        rankerMap()
    };
    combinedRanker()
};
