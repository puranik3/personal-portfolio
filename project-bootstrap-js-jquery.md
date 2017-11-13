# personal-portfolio
A simple one-page personal portfolio with a backend to handle messages sent from the contact form.

## Steps to run the app locally
It is not required to run the app locally as the API exposed by the online app (see next section) is public and can be accessed across domains (CORS enabled). If however for some reason you want to try running it locally, you can follow the steps below.  

Assuming you have >= Node.js v6.10.2 and Git CLI installed, these steps executed successfully in order will setup the app on your local system. Link to download Node and Git CLI are in the Appendix section.
1. Run `git clone https://github.com/puranik3/personal-portfolio` from the terminal (command line)
2. `cd personal-portfolio`
3. `npm install`
4. `npm start`
Now you can view the portfolio page in a browser by visiting the URL [https://localhost:3000/portfolio.html](https://localhost:3000/portfolio.html)

To be able to submit messages and view them you need a Mongo DB instance running. Assuming you have installed Mongo DB, follow these steps for setup. Link to download Mongo DB is in the Appendix section.
1. Run `mongod` from the another terminal
2. Run `mongo` (Mongo DB client) from yet another terminal. Add a user document to a `users` collection with an email and password field. Each of these are string-valued. Remember them for future use. Check Mongo DB docs for details on creating a collection and adding a document to it.
3. Fill the contact form in the portfolio page and submit.
4. To view the submitted messages, open [https://localhost:3000/login.html](https://localhost:3000/login.html). Login using the email and password of user document you added to the users table.
5. You will be redirected to a messages.html page on successful login. It will have all messages received from the contact form.

## Accessing the app online
The app is hosted on Heroku. The following links help access it.
1. The portfolio page can be accessed at [https://personal-portfolio-page.herokuapp.com/portfolio.html](https://personal-portfolio-page.herokuapp.com/portfolio.html)
2. The messages submitted using the contact form can be logged in and accessed. Login page is [https://personal-portfolio-page.herokuapp.com/login.html](https://personal-portfolio-page.herokuapp.com/login.html). The credentials for the registered user are email: puranik@digdeeper.in, password: test123. Upon login you will be redirected to the messages page with list of submitted messages.

## Using this project to learn Bootstrap, JavaScript and jQuery
1. First, build the [portfolio page](https://personal-portfolio-page.herokuapp.com/portfolio.html) using [Bootstrap](https://getbootstrap.com/docs/3.3/). We recommend Bootstrap v3.3.7 as stable version of Bootstrap 4.x is not yet released. While building the portfolio page, try to come up with a page that resembles the sample portfolio page as closely as possible. However it is your portfolio that is being created - make sure to use your details, photos, Twitter feed etc.

2. Next, build the contact form submission functionality __using jQuery__. This involves 2 main tasks.
    - __Validating the form before submission__: The name, email id and message fields must be filled by user. Once the 'Send Message' button is clicked, check for that these are filled in by the user. Those inputs that are not have to be highlighted using Bootstrap's has-error class (try submitting an incompletely filled form on sample page to see how the UI looks). In case everything is fine, the message details should be submitted to the server as described below.
    - __Submitting the details entered by the user to the server__: In order to submit message details to the server, raise an Ajax call (details mentioned below). Use $.ajax() to make the Ajax call.
    ```
    URL: https://personal-portfolio-page.herokuapp.com/messages
    Method: POST
    ```

    Data to be sent to the server is a JSON string with properties "name", "email", "phone", "message" and value being the corresponding input element's value in contact form (strings). Use $(...).val() to extract input element value. Sample data to be sent is shown below.
    ```
    {"name":"Nitish Mehrotra","email":"nitish.mehrotra@gmail.com","phone":"1234567890","message":"Would like to know details of Angular course"}
    ```

    On success, the server response looks like this. The existence of _id confirms the server was able to store the message successfully. If it is not present in the response, the status of submission is to be treated as failure.
    ```
    {"__v":0,"received":"2017-08-12T15:40:14.211Z","name":"Nitish Mehrotra","email":"nitish.mehrotra@gmail.com","phone":"1234567890","message":"Would like to know details of Angular course","_id":"598f215e8f0fb000110c99c8"}
    ```

    On success or failure an appropriate Bootstrap-styled alert component with appropriate message is to be shown. Use .alert-success to display success message (say, 'Your message is successully sent. I will get in touch with you shortly'). Use .alert-danger to display an error message (say, 'There was a problem sending your message').
    ```

    __Note__: While making the $.ajax() call, make sure to set 'contentType': 'application/json; charset=UTF-8'. Unless this is set the server will not be able to process the request.

3. Now build the [login page](https://personal-portfolio-page.herokuapp.com/login.html) using Bootstrap. Next, add login form submission functionality. This again involves the same 2 tasks as above (use jQuery). In addition, there is a task of storing the authorization token (authToken) obtained in response in local storage.
    - __Validating the form before submission__: On click of 'Login' button, validate the form inputs and highlight empty fields using has-error class. If both fields are filled, make the ajax call for login form submission.

    - __Submitting the details entered by the user to the server__: In order to submit message details to the server, raise an Ajax call (details mentioned below). Use $.ajax() to make the Ajax call.
    ```
    URL: https://personal-portfolio-page.herokuapp.com/login
    Method: POST
    ```

    Data to be sent to the server is a JSON string with properties "email", "password" and value being the corresponding input element's value in login form (strings). Sample data to be sent is shown below.
    ```
    {"email":"puranik@digdeeper.in","password":"test123"}
    ```
    __Note__: As mentioned before, the only valid user is __puranik@digdeeper.in__ with password __test123__.  

    On success, the server response looks like this. The existence of authToken confirms the server successfully authenticated the user. If it is not present in the response, the login attempt is to be treated as failure.
    ```
    {"email":"puranik@digdeeper.in","authToken":"eyJ0AXeiOiJKV1QiLCHh3GciOiJIUzI1NiJ9.eyJpc3MiOiJwZXJzb25hbC2wb3J0Zm9saW8tcGFnZS5oZXJva3VhcHAuY29tIiwic3ViIjoiNTk0YWNhNGU1NjkzOWEyHGI4MTg4MDM0In0=.y1e+/lyifhxThAvGjBwWPLiStjZU6gyxeX8EYuO4LQY="}
    ```

    On failure an appropriate Bootstrap-styled alert component with appropriate message is to be shown. Use .alert-danger to display an error message (say, 'Email or password incorrect'). On success, user is to be redirected to the a page with list of received messages. To do this, set window.location.pathname to the messages page you will create next.
    ```

    __Note__: Again, While making the $.ajax() call, make sure to set 'contentType': 'application/json; charset=UTF-8'.

    - __Stroring the authorization token obtained from server in local storage__: In order to make requests to authenticated endpoints (like GET /messages), an authorization token needs to be passed in the request. The authorization token is sent by the server on successful login (as authToken key in the JSON response on login). In order to set the Authorization HTTP header in requests to authenticated, we need a mechanism to store and retrieve the authToken across pages of the application (other details like logged in user's username are obtained on login and may also need to be stored). We can accomplish this using the local storage of the browser. If you wish you may use a different storage mechanism provided by the browser.  

    In order to store the authToken obtained in the response (assume response is an object containing server response on successful login), use
    ```
    localStorage.setItem( 'authToken', response.authToken );
    ```  
    
    In order to retrieve the stored information, use
    ```
    var authToken = localStorage.getItem( 'authToken' );
    ```

4. Next, build the [messages page](https://personal-portfolio-page.herokuapp.com/messages.html) using Bootstrap. It displays a list of messages received from various people via the contact form on the portfolio page, in tabular format. To get the list of messages whose details are to be populated into the table, you need to make an Ajax call whose details are given below. The list of messages is to be retrieved from the server on load of the page, and the table populated.

```
URL: https://personal-portfolio-page.herokuapp.com/messages
Method: GET
```

Since this is an authenticated endpoint, it will require an HTTP header to be sent alongwith the request. The HTTP header details are below (HTTP header key is Authorization and its value is Bearer <auth_token>)
```
Authorization: Bearer eyJ0AXeiOiJKV1QiLCHh3GciOiJIUzI1NiJ9.eyJpc3MiOiJwZXJzb25hbC2wb3J0Zm9saW8tcGFnZS5oZXJva3VhcHAuY29tIiwic3ViIjoiNTk0YWNhNGU1NjkzOWEyHGI4MTg4MDM0In0=.y1e+/lyifhxThAvGjBwWPLiStjZU6gyxeX8EYuO4LQY=
```

__Note__: To add HTTP headers in a $.ajax() call you can add the following to the $.ajax() options object passed as argument (authToken should be a variable holding the authorization token received in login response).
```
{
    url: "https://personal-portfolio-page.herokuapp.com/messages",
    method: "GET",
    header: {
        authorization: "Bearer " + authToken
    },
    ...
}
```

On success, the server response looks like this. It is an array of objects with details of messages sent via the contact form. Iterate through the array and populate the rows of the tables with message details.
```
[
    {
        "_id":"598f215e8f0fb000110c99c8",
        "received":"2017-06-21T19:35:51.107Z",
        "name":"Nitish Mehrotra",
        "email":"nitish.mehrotra@gmail.com",
        "phone":"1234567890",
        "message":"Would like to know details of Angular course"
        "__v":0
    },
    {
        "_id":"594ace0a9b489d001117654d",
        .
        .
        .
    },
    .
    .
    .
]
```

On failure an appropriate Bootstrap-styled alert component with appropriate message is to be shown. Use .alert-danger to display an error message (say, 'Unable to retrieve list of messages').

## Help
These videos on YouTube will guide you on how to go about creating the portfolio page and making the contact form functional. However use these only as a guide and not a tutorial. When stuck, try to get help from these - else avoid watching them.
* [Creating the page in Bootstrap - latter half of video](https://www.youtube.com/watch?v=jzRrF3yOAMI)
* [Adding contact form functionality - latter half of video](https://www.youtube.com/watch?v=JcLOXV2jk4U)

## Appendix
Here are links to download required platforms/tools. Installation is quite simple (usually single click install).
1. Node.js: https://nodejs.org/en/download/
2. Mongo DB (Community server): https://www.mongodb.com/download-center#community
3. Git CLI: https://git-scm.com/downloads
