function daily() {
    const fetchPromise = fetch('https://api.thevirustracker.com/free-api?countryTimeline=NZ', {headers : {"Accept" : "application/json",}});
    const streamPromise = fetchPromise.then( (response) => response.json() ); 
    streamPromise.then( (data) => {
        let tableContent = "<tr>" + "<th>DATE</th>" + "<th>Daily cases</th>" + "<th>Daily deaths</th>" + "<th>Total Cases</th>" + "<th>Total Recoveries</th>" + "<th>Total deaths</th>" + "</tr>";

        const addRecord = (record) => {

            tableContent += "<tr>" + "<td>";
        }

        data["timelineitems"].forEach(addRecord); // record in 'addRecord' is each dict in the array that corresponds to "timelineitems"
        document.getElementById('news').innerHTML = tableContent;
    } ); 
}
// to get "timelineitems" [] keys =  Object.keys(record)
function monthly() {
    const fetchPromise = fetch('https://api.thevirustracker.com/free-api?countryTimeline=NZ', {headers : {"Accept" : "application/json",}});
    const streamPromise = fetchPromise.then( (response) => response.json() ); 
    streamPromise.then( (data) => {
        
        data["timelineitems"].forEach((record) => {
            console.log(Object.keys(record));
        })


    } ); 
}

// daily();
monthly();

// dates are KEYS, 'timelineitems' is a key from the outer dict
// 'timelineitems' is an array with its elements being dictionaries

// "timelineitems": [
//     {
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