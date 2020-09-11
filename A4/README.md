## Take 1 — Registration and User-Authentication ##

It is time to update the web application you created for Dunedin Dairy to include a facility to buy products.

The service back-end now consists of two separate services and associated RESTful endpoints. You have been using one of these services for the previous assignments. The second service, dealing with purchases, is new to this assignment. The help page for the second service is available at http://redsox.uoa.auckland.ac.nz/dsa/Service.svc/help .

The first service is open to all, and this is the service you used in the first version of the application. This service, in addition to the end-points you used earlier, allows a user to register at the application site. Don't we all want to track the users! You will first add a new logical section to your app to implement this user-registration facility using the service endpoint that supports registration.

The other service is related to the shop, and is only accessible to registered users. This service allows registered users to puchase products from the shop. Registered users are required to authenticate before using this service. For each of the shop items, add a 'buy now' facility in the shop . This can be crudely implemented by linking this 'buy now' to the corresponding shop service endpoint. The browser will then take care of authentication by prompting the user for credentials. Credentials of a registered user need to be supplied at this point. You could also use the pre-registered user `jbon007` whose password is `jbon007passwd`.

### User Authentication ###

Do you see why the simple approach of letting the browser take care of authentication is not ideal?

A better approach to authentication is to have a (logical) login section and direct the user to it when they want to purchase something (and if the user is not already logged in). The login section would collect the user's credentials (username and password) and use the credentials when making a purchase request to the server backend.

```javascript
xhr.open("GET", uri, true, username, password);
xhr.withCredentials = true;
```

Try implementing this logic, and see why the `XHR` request fails when used with credentials. We will find a fix for this later when we do the second part of this assignment.

## Take 2 — User-Authentication and Pen-Testing ##


In this part, you will use local versions of the services and data. To this end, please download copies of the open service, the closed service, and the data first. You also need to change the Web.config files in the two services to point to the local location where you have saved the data.

1. [Data](https://cws.auckland.ac.nz/CWS/CourseWorkService.svc/cwm?cid=DairyData) - Unzip the data and place it in a folder such as H:\335\DairyData.
2. [Dairy Service (Open)](https://cws.auckland.ac.nz/CWS/CourseWorkService.svc/cwb?cid=DairySvc) - Unzip the service and place it in a folder such as H:\335\DairySvc.
3. [Dairy Service (Closed)](https://cws.auckland.ac.nz/CWS/CourseWorkService.svc/cwb?cid=DairySvcAuthenticated) - Unzip the service and place it in a folder such as H:\335\DairySvcAuth.
4. Now open the Web.config files in the two services, and find the line: `<add key="DataRoot" value="C:/WebRoot/Dairy/"/>` <br/>
   Change the value field to reflect where you saved the data. E.g., `H:\335\DairyData\`.
5. You can then run a service using the 64-bit edition of IIS Express. Example: `"C:\Program Files\IIS Express\IISExpress.exe" /port:8188 /path:H:\335\DairySvc`
   <br/> In Windows PowerShell, you need to prefix the above command line with & so that PowerShell can execute the command (rather than treating the command as a string):
  `& "C:\Program Files\IIS Express\IISExpress.exe" /port:8188 /path:H:\335\DairySvc`

Test the open service by pointing your browser to http://localhost:8188/DairyService.svc/help . The browser is expected to show the API doc you saw at http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/help . Stop the service by quitting IIS Express.
The 32-bit edition of IIS Express – C:\Program Files (x86)\IIS Express – is not compatible with the supplied services. You should not therefore use it.

Now start the open service again using IIS Express. If the data and the open service are correctly set up, you should see a list of the products when you point your browser to http://localhost:8188/DairyService.svc/items . <br/> 
Note that the output shown in the browser may not be well-formatted, and in this case, you may wish to view the source to see the unformatted content.

You can test the closed service using the following command line:
`"C:\Program Files\IIS Express\IISExpress.exe" /port:8189 /path:H:\335\DairySvcAuth`

Test the service by pointing your browser to http://localhost:8189/Service.svc/help . Note that viewing the closed service requires authentication, and you could use the pre-registered user `jbon007` whose password is `jbon007passwd`.

#### User Authentication ####
We noted in the first part of this assignment that a better approach to authentication is to have a (logical) login section and direct the user to it when they want to purchase something (and if the user is not already logged in). The login section would collect the user's credentials (username and password) and use the credentials when making a purchase request to the server backend.

```javascript
xhr.open("GET", uri, true, username, password);
xhr.withCredentials = true;
```
You would have also noted that the `XHR` request failed when supplied with user credentials.

`XHR` allows passing user name and password *only if* the origins match – i.e., the script that invokes the `XHR` and the URI the `XHR` tries to reach *should have the same origin*. This is called the **Same Origin Policy**.

Since you now have access to the shop service, you can publish your UI at the same location so that Same Origin Policy holds. Extend the UI you developed in the first part to incorporate this login logic (i.e., collect the user's credentials and use the credentials with XHR when making a puchase request) .

***

**full assignment spec found here** https://canvas.auckland.ac.nz/courses/45884/assignments/192155
