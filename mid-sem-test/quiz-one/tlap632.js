// HOME PAGE
function showHome() {
    document.getElementById('home').style.display = "inline";
    document.getElementById('staff').style.display = "none";
}

// FUNCTIONS RELATED TO THE STAFF PAGE
function fetchStaff() { // fetch staff data from server
    // http://redsox.uoa.auckland.ac.nz/cors/CorsProxyService.svc/proxy?url={URL}
    // https://dividni.com/cors/CorsProxyService.svc/proxy?url={URL}
    // https://unidirectory.auckland.ac.nz/rest/search?orgFilter=MATHS
    document.getElementById('home').style.display = "none";
    document.getElementById('staff').style.display = "inline";

    const url = "http://redsox.uoa.auckland.ac.nz/cors/CorsProxyService.svc/proxy?url=https://unidirectory.auckland.ac.nz/rest/search?orgFilter=MATHS";
    const fetchPromise = fetch(url, {headers : {"Accept" : "application/json",}});
    const streamPromise = fetchPromise.then( (response) => response.json() ); 
    // streamPromise.then( (data) => showStaff(data) ); 
    streamPromise.then( (data) => showStaff(data) ); 
}

function showStaff(staffRecords) {
    console.log(staffRecords); // check if it got passed through successfully

    // https://unidirectory.auckland.ac.nz/people/imageraw/{upi}/{imageId}/biggest 
    const pic = "https://unidirectory.auckland.ac.nz/people/imageraw/";
    const vcard = "https://unidirectory.auckland.ac.nz/people/vcard/";
    
    // record.profileUrl[1] gives the upi for the image
    // record.profileUrl[0] gives the upi for the actual vcard content
    
    let staffContent = "";

    const addRecord = (record) => {
        staffContent += "<tr><td id=col1><img src=" + pic + record.profileUrl[1] + "/" + record.imageId + "/biggest> </td>" +
            "<td id=col2><h3 id=staffname>" + record.title + ' ' + record.firstname + ' ' + record.lastname + "</h3> <br>" + record.jobtitles[0] + " in " +
            record.orgunitnames[0] + "<br><br>" + "<strong>Contact Details:</strong><br><br>" + 
            "Email: <a href=mailto:" + record.emailAddresses + ">" + record.emailAddresses + "</a><br><br>";
            
    }

    // ADD VCARD
    // "<a href=" + vcard + record.profileUrl[0] + ">Add " + record.title + ' ' + record.firstname + ' ' + record.lastname + "\'s details to your contacts</a>" + "</td></tr>\n";

    // fetch vcard details
    const url = "https://dividni.com/cors/CorsProxyService.svc/proxy?url=https://unidirectory.auckland.ac.nz/people/vcard/j-sneyd";
    const fetchPromise = fetch(url, {headers : {"Accept" : "application/json",}});
    const streamPromise = fetchPromise.then( (response) => response.text() ); 
    streamPromise.then( (data) => {
        const vCardLine = JSON.parse(data).split("\n"); 
        const someDict = {};

        for (var i = 0; i < vCardLine.length; i++) {
            let temp = vCardLine[i].split(":"); // ["ADR;WORK;PREF", ";;535 Pine Hill Road; Dunedin; New Zealand"]
            let key = temp[0].split(";")[0]; //  [ ["ADR", "WORK", "PREF"],  ";;535 Pine Hill Road; Dunedin; New Zealand"]
            // temp[1].split(";") = ["", "", "535 Pine Hill Road", " Dunedin", " New Zealand"]
            let value;
            if (key === "ADR") {
                value = temp[1].slice(2, temp[1].length);
                value = temp[1].split(";");
                value = value.slice(2, value.length).join(', ');
            } else {
                value = temp[1]; 
            }
            
            someDict[key] = value;
        }

        document.getElementById(col2).innerHTML += "Call: <a href=tel:" + someDict['TEL'] + ">" + someDict['TEL'] + "</a>";


    } ); 

    




    staffRecords["list"].forEach(addRecord); // record in 'addRecord' is each [] in the array returned by the stream, which is assigned to the const 'staffRecord'
    document.getElementById('stafflist').innerHTML = staffContent; 
}

function staffContact() { // JUST AN EXAMPLE
    // : https://unidirectory.auckland.ac.nz/people/vcard/{upi} 
    const url = "https://dividni.com/cors/CorsProxyService.svc/proxy?url=https://unidirectory.auckland.ac.nz/people/vcard/j-sneyd";
    const fetchPromise = fetch(url, {headers : {"Accept" : "application/json",}});
    const streamPromise = fetchPromise.then( (response) => response.text() ); 
    streamPromise.then( (data) => console.log(JSON.stringify(data)) ); 

}

showHome();
// +64 9 923 7474
// jsne010@aucklanduni.ac.nz

// 32nd RECORD:
//
// allOrgUnits: (2) ["MATHS", "SCIFAC"]
// allStaffUnits: (2) ["MATHS", "SCIFAC"]
// cat: "person"
// emailAddresses: ["jsne010@aucklanduni.ac.nz"]
// extn: "87474"
// firstname: "James"
// hasAlternativeContactInfo: false
// id: "4198360External"
// imageId: "10289392"
// includesPhd: false
// jobcodes: ["A00294"]
// jobtitles: ["Professor"]
// lastname: "Sneyd"
// legalFirstName: "A"
// legalLastName: "Sneyd"
// legalMiddleName: "James Robert"
// mediaContact: true
// mediaKeywords: (2) ["Nonlinear dynamical systems", "Mathematical psychology"]
// names: (2) ["James Sneyd", "A Sneyd"]
// onlyPhd: false
// orgunitids: ["MATHS"]
// orgunitnames: ["Mathematics"]
// personId: 4198360
// personType: "External"
// positionIds: [0]
// profileId: 4256045
// profileUrl: (2) ["j-sneyd", "jsne010"]
// title: "Professor"
// whenLastUpdated: "2020-08-03T02:13:48Z"

// EXAMPLE OF UNDEFINED TITLE
//
// allOrgUnits: (2) ["MATHS", "SCIFAC"]
// allStaffUnits: (2) ["MATHS", "SCIFAC"]
// cat: "person"
// emailAddresses: ["jonny.stephenson@auckland.ac.nz"]
// extn: "84557"
// firstname: "Jonny"
// hasAlternativeContactInfo: false
// id: "11110692External"
// imageId: "11139658"
// includesPhd: false
// jobcodes: ["A00800"]
// jobtitles: ["Professional Teaching Fellow"]
// lastname: "Stephenson"
// legalFirstName: "Jonathan"
// legalLastName: "Stephenson"
// legalMiddleName: "Ralph"
// mediaContact: false
// names: (2) ["Jonny Stephenson", "Jonathan Stephenson"]
// onlyPhd: false
// orgunitids: ["MATHS"]
// orgunitnames: ["Mathematics"]
// personId: 11110692
// personType: "External"
// positionIds: [0]
// profileId: 11110695
// profileUrl: (2) ["jonny-stephenson", "jste980"]
//     NO TITLE
// whenLastUpdated: "2020-07-14T00:05:15Z"








//  VCARD INFO
//
// "BEGIN:VCARD\n
// VERSION:3.0\n
// N:Sneyd;James;;Prof;;\n
// FN:James Sneyd\n
// ORG:Mathematics\n
// TITLE:Professor\n
// TEL;TYPE=WORK,VOICE:+6499237474\n
// ADR;TYPE=WORK:;;38 PRINCES ST,AUCKLAND,1010,New Zealand\n
// EMAIL;TYPE=PREF,INTERNET:sneyd@math.auckland.ac.nz\nREV:01200831T203044Z\nEND:VCARD\n"