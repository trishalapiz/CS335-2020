function daily() {
    const fetchPromise = fetch('https://api.thevirustracker.com/free-api?countryTimeline=NZ', {headers : {"Accept" : "application/json",}});
    const streamPromise = fetchPromise.then( (response) => response.json() ); 
    streamPromise.then( (data) => {
        let tableContent = "<tr>" + "<th>DATE</th>" + "<th>Daily cases</th>" + "<th>Daily deaths</th>" + "<th>Total Cases</th>" + "<th>Total Recoveries</th>" + "<th>Total deaths</th>" + "</tr>";

        const keys = []; // put the dates into a list
        data["timelineitems"].forEach((record) => {
            keys.push(Object.keys(record)); // enter all the keys
        })
        console.log(keys);

        const addRecord = (record) => {

            const date = Object.keys(record);

            tableContent += "<tr>" + "<td>" + Object.keys(record) + "</td><td>" + record[Object.keys(record)]["new_daily_cases"] + "</td><td>" + record[Object.keys(record)]["new_daily_deaths"] +
                            "</td><td>" + record[Object.keys(record)]["total_cases"] + "</td><td>" + record[Object.keys(record)]["total_recoveries"] + "</td><td>" + record[Object.keys(record)]["total_deaths"];
        }

        // "timelineitems": [
        //     {
        //       "2/28/20": {
        //         "new_daily_cases": 1,
        //         "new_daily_deaths": 0,
        //         "total_cases": 1,
        //         "total_recoveries": 0,
        //         "total_deaths": 0
        //       },

        // access FIRST RECORD (record = the dict) BY data["timelineitems"][0]


        data["timelineitems"].forEach(addRecord); // record in 'addRecord' is each dict in the array that corresponds to "timelineitems"
        document.getElementById('news').innerHTML = tableContent;
    } ); 
}
// to get "timelineitems" [] keys =  Object.keys(record)
function monthly() {
    // BAR CHART
    // https://css-tricks.com/how-to-make-charts-with-svg/#bar-charts
    // // https://codepen.io/team/css-tricks/pen/11765f3b51a188f30c624588f75b73d5?editors=110

    // PIE CHART https://css-tricks.com/how-to-make-charts-with-svg/#pie-charts

    const fetchPromise = fetch('https://api.thevirustracker.com/free-api?countryTimeline=NZ', {headers : {"Accept" : "application/json",}});
    const streamPromise = fetchPromise.then( (response) => response.json() ); 
    streamPromise.then( (data) => {
        
        // // prints out all the keys, the keys being the dates
        // data["timelineitems"].forEach((record) => {
        //     console.log(Object.keys(record));
        // })

        data["timelineitems"].forEach((record) => {
            console.log(Object.keys(record)); // for each record, print out the key
        })


    } ); 
}

daily();
// monthly();

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