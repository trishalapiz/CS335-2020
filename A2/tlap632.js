// function for FETCHING DATA
function fetchGraph() {
    const fetchPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/g', {headers : {"Accept" : "application/json",}});
    const streamPromise = fetchPromise.then( (response) => response.json() ); 
    streamPromise.then( (data) => {
        makeGraph(data);
        document.getElementById('matrix').innerText = JSON.stringify(data);
    }); 
    
}

// function for the NODES
function makeGraph(graph) { // passes a nested array
    
    let svg = "";
    let radius = 17;
    let height = parseInt(document.getElementById("drawnGraph").getAttribute("viewBox").split(' ')[3], 10); // 800

    // CREATE NODES
    for (let i = 1; i < graph.length+1; ++i){ 
        svg += "<circle cx='" + ((2*radius)*i) + "' cy='" + height/2 + "' r='" + radius + "' stroke='black' stroke-width='1' fill='azure'/>\n";
        
        // TEXT
        if (i > 10) {
            svg += "<text x='" + (((2*radius)*i)-8) + "' y='" + ((height/2)+4) + "' >" + (i-1).toString() + "</text>";
        } else if (i > 98) {
            svg += "<text x='" + (((2*radius)*i)-20) + "' y='" + ((height/2)+4) + "'  >" + (i-1).toString() + "</text>";
        } else {
            svg += "<text x='" + (((2*radius)*i)-4) + "' y='" + ((height/2)+4) + "' >" + (i-1).toString() + "</text>";
        }
        
    } 
    
    let width = graph.length * 50;
    document.getElementById('drawnGraph').setAttribute("viewBox", "0 0 " + width + " " + 200);
    document.getElementById('drawnGraph').innerHTML = svg;

    makeConnections(graph, radius, height);
    

}

// function for the EDGES
function makeConnections(graph, r, h) { 
    for (var i = 1; i < graph.length+1; ++i) { // row
        let connection = "";
        for (var j = i; j < graph.length+1; ++j) { // column
            if (graph[i-1][j-1] == 1 && i < j) { //  j is the node ur connecting the line to
                connection += "<path d='M " + ((2*r)*i) +  " " + ((h/2)+r) + " A 20 10, 0 1 0, " + ((2*r)*j) + " " +  ((h/2)+r) + "' stroke='black' fill='transparent' />\n";
                document.getElementById('drawnGraph').innerHTML += connection;
            }
            
        }
    }

}

fetchGraph(); // call in order to create and display the undirected graph


