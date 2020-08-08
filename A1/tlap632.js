
// HOME PAGE
function home() {
    document.getElementById('home').style.display = "inline";
    document.getElementById('products').style.display = "none";
    document.getElementById('location').style.display = "none";
    document.getElementById('news').style.display = "none";
    document.getElementById('guest').style.display = "none";
}

// FUNCTIONS RELATED TO THE PRODUCTS PAGE
function products() { // get product data
    document.getElementById('home').style.display = "none";
    document.getElementById('products').style.display = "inline";
    document.getElementById('location').style.display = "none";
    document.getElementById('news').style.display = "none";
    document.getElementById('guest').style.display = "none";

    const fetchPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/items', {headers : {"Accept" : "application/json",}});
    const streamPromise = fetchPromise.then( (response) => response.json() ); 
    streamPromise.then( (data) => displayProducts(data) ); 
}

function displayProducts(products) { // products = the array of product records
    const pic = "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/itemimg?id="
    let itemContent = "";

    const addRecord = (record) => {
        itemContent += "<tr><td><img src=" + pic + record.ItemId + " height=300 width=300> </td><td>" 
        + record.Title + "<br>" + record.Origin + "<br>$" + record.Price + "<br>" + record.Type + 
        "<br><button type=submit class=buy>Buy Now</button>" +"</td></tr>\n";
    }
  products.forEach(addRecord);
  document.getElementById('items').innerHTML = itemContent;
}

function searchProducts() { // retrieve products based on user search
    const input = document.getElementById('productSearch').value;
    const term ="http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/search?term=" + input;
    const fetchPromise = fetch(term, {headers : {"Accept" : "application/json",}});
    const streamPromise = fetchPromise.then( (response) => response.json() ); 
    streamPromise.then( (data) => displayProducts(data) ); 
}

// FUNCTIONS RELATED TO THE LOCATIONS PAGE
function locations() {
    document.getElementById('home').style.display = "none";
    document.getElementById('products').style.display = "none";
    document.getElementById('location').style.display = "inline";
    document.getElementById('news').style.display = "none";
    document.getElementById('guest').style.display = "none";

    const fetchPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/vcard', {headers : {"Accept" : "application/json",}});
    const streamPromise = fetchPromise.then( (response) => response.text() );
    streamPromise.then( (data) => showVCard(JSON.stringify(data)));
}

function showVCard(data) {
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

    document.getElementById('locationDetails').innerHTML = "Find us at: " + someDict['ADR'] + "<br><br> Email us at: " +
    "<a class=vcard href=mailto:" + someDict['EMAIL'] + ">" + someDict['EMAIL'] + "</a> <br><br> Or ring us on " + 
    "<a class=vcard href=tel:" + someDict['TEL'] + ">" + someDict['TEL'] + 
    "</a> <br><br> <a href=http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/vcard>Add us to your contacts</a>";
}

// FUNCTIONS RELATED TO THE NEWS PAGE
function news() {
    document.getElementById('home').style.display = "none";
    document.getElementById('products').style.display = "none";
    document.getElementById('location').style.display = "none";
    document.getElementById('news').style.display = "inline";
    document.getElementById('guest').style.display = "none";

    const fetchPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/news', {headers : {"Accept" : "application/json",}});
    const streamPromise = fetchPromise.then( (response) => response.json() ); 
    streamPromise.then( (data) => displayNews(data) );
}

function displayNews(news) {
    let newsContent = ""; // 'record' is one {} in the 'news' JSON array
    const addRecord = (record) => {
        newsContent += "<tr><td> <img src=" + record.enclosureField.urlField + "> </td>" + 
        "<td><a href=" + record.linkField + ">" + record.titleField + "</a>" + 
        "<p>" + record.descriptionField + "<p>"  + record.pubDateField + "</td></tr>\n";
    }
    
    news.forEach(addRecord);
    
    document.getElementById('dairyNews').innerHTML = newsContent; 
}

// FUNCTIONS RELATED TO THE GUEST BOOK PAGE
function guestBook() {
    document.getElementById('home').style.display = "none";
    document.getElementById('products').style.display = "none";
    document.getElementById('location').style.display = "none";
    document.getElementById('news').style.display = "none";
    document.getElementById('guest').style.display = "inline";
    
    // retrieving comments
    document.getElementById('book').src = 'http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/htmlcomments';
}

function postComment() {
    const message = document.getElementById('commentSpace').value; // the actual comment
    const name = document.getElementById('nameSpace').value; // who posted
    const comment = "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/comment?name=" + name;

    const fetchPromise = fetch(comment, {
        method: "POST",
        body: JSON.stringify(message),
        headers : {
            "Content-Type" : "application/json"
        }
    });
    const streamPromise = fetchPromise.then( (response) => response.json() );
    streamPromise.then( (data) => {document.getElementById('book').src = 'http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/htmlcomments'}); // show comment straight away after it's posted

}

