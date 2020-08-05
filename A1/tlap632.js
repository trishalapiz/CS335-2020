
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

function displayProducts(products) {
    let itemContent = "<tr> <td>Image</td> <td>Title</td> <td>Origin</td> <td>Price</td> <td>Type</td>" 
    const addRecord = (record) => {
    // itemContent += "<tr><td>" + "hello" + "</td><td>" + record.Origin + "</td><td>" + record.Price + "</td><td>" + record.Title + "</td><td>" + record.Type + "</td></tr>\n";
    itemContent += "<tr><td>" + "hello" + "</td><td>" + record.Title + "</td><td>" + record.Origin + "</td><td>" + record.Price + "</td><td>" + record.Type + "</td></tr>\n";
    // fetch("http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/itemimg?id={ID}", {headers : {"Accept" : "application/json",}}).then( (response) => response.json()).then( ( (data) => alert(data) ));
  }

  products.forEach(addRecord);
  document.getElementById('items').innerHTML = itemContent;
}

//     // table id = "items"
//     // extract records
//   var col = [];
//   for (var i = 0; i < products.length; i++) {
//     for (var key in products[i]) {
//       if (col.indexOf(key) === -1) {
//         col.push(key);
//       }
//     }
//   }

//   // create dynamic table
//   var table = document.createElement("table"); //createElement(tagName)

//   // create HTML table header row

//   var tr = table.insertRow(-1);

//   for (var j = 0; j < col.length; j++) {
//     var th = document.createElement("th");
//     th.innerHTML = col[j];
//     tr.appendChild(th);
//   }

//   // add JSON data as rows
//   for (var k = 0; k < products.length; k++) {
//     tr = table.insertRow(-1);

//     for (var m = 0; m < col.length; m++) {
//       var tabCell = tr.insertCell(-1);
//       tabCell.innerHTML = products[k][col[m]];
//     }
//   }

//   document.getElementById('items').appendChild(table);


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

    // const xhr = new XMLHttpRequest(); // create an XMLHttpRequest object
    // const uri = "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/news";
    // xhr.open("GET", uri, true);
    // xhr.setRequestHeader("Accept", "application/json;charset=UTF-8");
    // xhr.onload = () => {
    //   const news = JSON.parse(xhr.responseText);
    //   displayNews(news);
    // }
    // xhr.send(null);

    const fetchPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/news', {headers : {"Accept" : "application/json",}});
    const streamPromise = fetchPromise.then( (response) => response.json() ); // returns JSON object "c519c8c8-5e56-4de6-b8a0-b2a3f4781eff"
    streamPromise.then( (data) => displayNews(data) );
    

    
    // data presented as 
    // [{"descriptionField":"String content",
	// "enclosureField":{
	// 	"lengthField":"String content",
	// 	"typeField":"String content",
	// 	"urlField":"String content"
	// },
	// "guidField":"String content",
	// "linkField":"String content",
	// "pubDateField":"String content",
	// "titleField":"String content"
    // }]

    // const fetchPromise = fetch("http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/news", {headers : {"Accept" : "application/json",}});
    // const streamPromise = fetchPromise.then( (response) => response.text() );
    // streamPromise.then( (data) => { data.split
    //     let newsContent = "<tr> <td>Description</td> <td>Title</td> <td>Image</td> <td>Time</td> </tr>\n";
    //     data.array.forEach(element => {
            
    //     });
    // });

    
}

function displayNews(news) {

//     // <table id="dairyNews"></table> WHERE NEWS IS POPULATED

//     // [{ SPLIT CONTENTS USING NEWLINE CHARACTER
//     //KEYS = descriptionField, enclosureField, guidField, linkField, pubDateField, titleField
    
//     //productsArray[0] is {"ItemId":"248309242","Origin":"France","Price":"99.99","Title":"Fromage frais battu 7.8%MG 5 kg","Type":"Cheese"}
//     // so productsArray[0].keys are ItemId, Origin, Price, Title, Type
    
//     //     "descriptionField":"String content",
//     //     "enclosureField":{
//     //         "lengthField":"String content",
//     //         "typeField":"String content",
//     //         "urlField":"String content"
//     //     },
//     //     "guidField":"String content",
//     //     "linkField":"String content",
//     //     "pubDateField":"String content",
//     //     "titleField":"String content"
//     // }]

    // enclosureField.urlField is the IMAGE
    let newsContent = "<tr> <td>Image</td> <td>Title</td> <td>Description</td> <td>Time</td> </tr>\n";
    const addRecord = (record) => {
        // newsContent += "<tr><td>" + record.descriptionField + "</td><td>" + record.titleField + "</td><td> <img src=" +  record.enclosureField.urlField + " height=300 width=300>  </td><td>" + record.pubDateField + "</td></tr>\n";
        newsContent += "<tr><td> <img src=" + record.enclosureField.urlField + " height=300 width=300>  </td><td>" + record.titleField + "</td><td>" + record.descriptionField + "</td><td>"  + record.pubDateField + "</td></tr>\n";
    }
      news.forEach(addRecord);
    
//     // record is {} in []
//     // eg for products, this is ONE RECORD: {"ItemId":"248309242","Origin":"France","Price":"99.99","Title":"Fromage frais battu 7.8%MG 5 kg","Type":"Cheese"}
    // news.forEach((record) => {
    //     newsContent += "<tr><td>" + record.descriptionField + "</td><td>" + record.titleField + "</td><td> <img src=" +  record.enclosureField.urlField + " height=300 width=300>  </td><td>" + record.pubDateField + "</td></tr>\n";
    //   }); // populate table
    
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
