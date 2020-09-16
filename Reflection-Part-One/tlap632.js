function daily() {
    const fetchPromise = fetch('https://api.thevirustracker.com/free-api?countryTimeline=NZ', {headers : {"Accept" : "application/json",}});
    const streamPromise = fetchPromise.then( (response) => response.json() ); 
    streamPromise.then( (data) => {
        let tableContent = "<tr>" + "<th>DATE</th>" + "<th>Daily cases</th>" + "<th>Daily deaths</th>" + "<th>Total Cases</th>" + "<th>Total Recoveries</th>" + "<th>Total deaths</th>" + "</tr>";

        const addRecord = (record) => { // record is a dictionary full of daily cases
            // console.log(Object.keys(record)); // ["2/28/20", "2/29/20", "3/01/20", "3/02/20", "3/03/20", "3/04/20",....]
            for (key in record) {
                // console.log(key); // eg 2/28/20
                if (key == "stat") {
                    break;
                } else {
                    tableContent += "<tr>" + "<td>" + key + "</td><td>" + record[key]["new_daily_cases"] + "</td><td>" + record[key]["new_daily_deaths"] +
                            "</td><td>" + record[key]["total_cases"] + "</td><td>" + record[key]["total_recoveries"] + "</td><td>" + record[key]["total_deaths"] + "</td></tr>";
                }
            }

        }

        data["timelineitems"].forEach(addRecord); // record in 'addRecord' is a BIG DICTIONARY within the array"
        document.getElementById('news').innerHTML = tableContent;
    } ); 
}

function monthly() {
    // BAR CHART
    // https://css-tricks.com/how-to-make-charts-with-svg/#bar-charts
    // // https://codepen.io/team/css-tricks/pen/11765f3b51a188f30c624588f75b73d5?editors=110

    // PIE CHART https://css-tricks.com/how-to-make-charts-with-svg/#pie-charts

    const fetchPromise = fetch('https://api.thevirustracker.com/free-api?countryTimeline=NZ', {headers : {"Accept" : "application/json",}});
    const streamPromise = fetchPromise.then( (response) => response.json() ); 
    streamPromise.then( (data) => {
        const monthDict = {} 
        
        const addRecord = (record) => { // record is a dictionary full of daily cases
            // console.log(Object.keys(record)); // ["2/28/20", "2/29/20", "3/01/20", "3/02/20", "3/03/20", "3/04/20",....]
            const dates = Object.keys(record); // returns array
            const latestDate = dates[Object.keys(dates)[Object.keys(dates).length - 2]]; // -2 because last key is "stat"
            const caseTotal = record[latestDate]["total_cases"] // total amount of cases recorded so far
            console.log("total amount of cases recorded are", caseTotal); // 1801

            
            for (key in record) {
                if (key == "stat") {
                    break;
                } else {

                    let dateSplit = key.split("/"); // ["2", "28", "20"]
                    // console.log("total amount of cases recorded are", caseTotal); // 1801

                    if (dateSplit[0] in monthDict) { // if month already in month dict
                        monthDict[dateSplit[0]] += record[key]["new_daily_cases"];
                    } else { // otherwise, if not
                        monthDict[dateSplit[0]] = record[key]["new_daily_cases"];
                    }

                }
                
            }

        }

        data["timelineitems"].forEach(addRecord); // populate the dict
        drawGraph(monthDict);

    }); 
}

function drawGraph(totalCases) {
    // totalCases = {2: 1, 3: 646, 4: 829, 5: 28, 6: 24, 7: 32, 8: 178, 9: 63}
    const months = {"1" : "January", "2" : "February", "3" : "March", "4" : "April", "5" : "May", "6" : "June", "7" : "July", "8" : "August", "9" : "September", "10" : "October", "11" : "November", "12" : "December" };
    console.log("total cases", totalCases);
    const dictLength = Object.keys(totalCases).length; // get length of dictionary
    console.log("length of dict", dictLength);

    let svg = "";
    let height = 100 / dictLength;
    let y = 10;

    // "<text x='" + (((2*radius)*i)-8) + "' y='" + ((height/2)+4) + "' >" + (i-1).toString() + "</text>";

    for (month in totalCases) {
        svg += "<text x='" + 10 + "' y='" + (y + 8) + "' font-size='xx-small'>" + months[month].toString() + "</text>" + 
                "<rect x='70' y='" + y + "' height='" + height + "' width='" + totalCases[month]/10 + "' stroke='lime' fill='yellow'/>" +
                "<text x='" + ((totalCases[month]/10) + 80) + "' y='" + (y + 9) + "' font-size='xx-small'>" + totalCases[month].toString() + "</text>";
        y += height;
    }

    document.getElementById('infograph').innerHTML = svg;

}

daily();
monthly();

// dates are KEYS, 'timelineitems' is a key from the outer dict
// 'timelineitems' is an array with its elements being dictionaries

// "timelineitems": [
//     { -- REPRESENTS 'record'
//       "2/28/20": {
//         "new_daily_cases": 1,
//         "new_daily_deaths": 0,
//         "total_cases": 1,
//         "total_recoveries": 0,
//         "total_deaths": 0
//       },
//       "2/29/20": {
//         "new_daily_cases": 0,
//         "new_daily_deaths": 0,
//         "total_cases": 1,
//         "total_recoveries": 0,
//         "total_deaths": 0
//       },
//       "3/01/20": {
//         "new_daily_cases": 0,
//         "new_daily_deaths": 0,
//         "total_cases": 1,
//         "total_recoveries": 0,
//         "total_deaths": 0
//       },
//       "3/02/20": {
//         "new_daily_cases": 0,
//         "new_daily_deaths": 0,
//         "total_cases": 1,
//         "total_recoveries": 0,
//         "total_deaths": 0
//       },