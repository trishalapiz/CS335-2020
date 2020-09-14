function daily() {
    const fetchPromise = fetch('https://api.thevirustracker.com/free-api?countryTimeline=NZ', {headers : {"Accept" : "application/json",}});
    const streamPromise = fetchPromise.then( (response) => response.json() ); 
    streamPromise.then( (data) => console.log(data) ); 
}

function monthly() {
    const fetchPromise = fetch('https://api.thevirustracker.com/free-api?countryTimeline=NZ', {headers : {"Accept" : "application/json",}});
    const streamPromise = fetchPromise.then( (response) => response.json() ); 
    streamPromise.then( (data) => console.log(data) ); 
}

daily();
monthly();