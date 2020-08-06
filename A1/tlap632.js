
// HOME PAGE
function home() {
    document.getElementById('home').style.display = "inline";
    document.getElementById('products').style.display = "none";
    document.getElementById('location').style.display = "none";
    document.getElementById('news').style.display = "none";
    document.getElementById('guest').style.display = "none";
}

// FUNCTIONS RELATED TO THE PRODUCTS PAGE
function products() {
    document.getElementById('home').style.display = "none";
    document.getElementById('products').style.display = "inline";
    document.getElementById('location').style.display = "none";
    document.getElementById('news').style.display = "none";
    document.getElementById('guest').style.display = "none";

    const fetchPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/items', {headers : {"Accept" : "application/json",}});
    const streamPromise = fetchPromise.then( (response) => response.json() ); // returns JSON object "c519c8c8-5e56-4de6-b8a0-b2a3f4781eff"
    streamPromise.then( (data) => displayProducts(data) ); 
}

function displayProducts(products) { // CHANGE PRODUCT LAYOUT LATER
    const pic = "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/itemimg?id="
    let itemContent = "";
    // let itemContent = "<tr> <th>Image</th> <th>Title</th> <th>Origin</th> <th>Price</th> <th>Type</th>" // has headings
    // let itemContent = "<tr> <td>Image</td> <td>Title</td> <td>Origin</td> <td>Price</td> <td>Type</td>" // has headings
    const addRecord = (record) => {
    // itemContent += "<tr><td>" + "hello" + "</td><td>" + record.Origin + "</td><td>" + record.Price + "</td><td>" + record.Title + "</td><td>" + record.Type + "</td></tr>\n";
    itemContent += "<tr><td><img src=" + pic + record.ItemId +" height=300 width=300> </td><td>" + record.Title + "</td><td>" + record.Origin + "</td><td>$" + record.Price + "</td><td>" + record.Type + "</td></tr>\n";
    
    // fetch("http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/itemimg?id={ID}", {headers : {"Accept" : "application/json",}}).then( (response) => response.json()).then( ( (data) => alert(data) ));
  }
  // "<img src"
  // <img src=" + record.enclosureField.urlField + " height=300 width=300> 
  products.forEach(addRecord);
  document.getElementById('items').innerHTML = itemContent;
}

function searchProducts() {
    const input = document.getElementById('productSearch').value;
    const term ="http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/search?term=" + input;
    const fetchPromise = fetch(term, {headers : {"Accept" : "application/json",}});
    const streamPromise = fetchPromise.then( (response) => response.json() ); // returns JSON object "c519c8c8-5e56-4de6-b8a0-b2a3f4781eff"
    streamPromise.then( (data) => displayProducts(data) ); 
}

// FUNCTIONS RELATED TO THE LOCATIONS PAGE
function locations() {
    document.getElementById('home').style.display = "none";
    document.getElementById('products').style.display = "none";
    document.getElementById('location').style.display = "inline";
    document.getElementById('news').style.display = "none";
    document.getElementById('guest').style.display = "none";
}

// FUNCTIONS RELATED TO THE NEWS PAGE
function news() {
    document.getElementById('home').style.display = "none";
    document.getElementById('products').style.display = "none";
    document.getElementById('location').style.display = "none";
    document.getElementById('news').style.display = "inline";
    document.getElementById('guest').style.display = "none";

    const fetchPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/news', {headers : {"Accept" : "application/json",}});
    const streamPromise = fetchPromise.then( (response) => response.json() ); // returns JSON object "c519c8c8-5e56-4de6-b8a0-b2a3f4781eff"
    streamPromise.then( (data) => displayNews(data) );
    
}

function displayNews(news) {

//     // <table id="dairyNews"></table> WHERE NEWS IS POPULATED

    // enclosureField.urlField is the IMAGE
    let newsContent = "<tr> <td>Image</td> <td>Title</td> <td>Description</td> <td>Time</td> </tr>\n";
    const addRecord = (record) => {
        // newsContent += "<tr><td>" + record.descriptionField + "</td><td>" + record.titleField + "</td><td> <img src=" +  record.enclosureField.urlField + " height=300 width=300>  </td><td>" + record.pubDateField + "</td></tr>\n";
        // newsContent += "<tr><td> <img src=" + record.enclosureField.urlField + " height=300 width=300>" + "<a href=" + record.enclosureField.linkField + ">" + </a>" + "</td><td>" + record.titleField + "</td><td>" + record.descriptionField + "</td><td>"  + record.pubDateField + "</td></tr>\n";
        newsContent += "<tr><td> <img src=" + record.enclosureField.urlField + " height=300 width=300> </td>" + "<td><a href=" + record.linkField + ">" + record.titleField + "</a>" + "</td><td>" + record.descriptionField + "</td><td>"  + record.pubDateField + "</td></tr>\n";
    
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
}
