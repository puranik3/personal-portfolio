# personal-portfolio
A simple one-page personal portfolio with a backend to handle messages sent from the contact form

## Steps to run the app locally
Assuming you have >= Node.js v6.10.2 and Git CLI installed, these steps executed successfully in order will setup the app on your local system.
1. Run `git clone https://github.com/puranik3/personal-portfolio` from the terminal (command line)
2. `cd personal-portfolio`
3. `npm install`
4. `npm start`
Now you can view the portfolio page in a browser by visiting the URL [https://localhost:3000/portfolio.html](https://localhost:3000/portfolio.html)

To be able to submit messages and view them you need a Mongo DB instance running. Assuming you have installed Mongo DB, follow these steps for setup.
1. Run `mongod` from the another terminal
2. Run `mongo` (Mongo DB client) from yet another terminal. Add a user document to a `users` collection with an email and password field. Each of these are string-valued. Remember them for future use. Check Mongo DB docs for details.
3. Fill the contact form in the portfolio page and submit.
4. To view the submitted messages, open [https://localhost:3000/login.html](https://localhost:3000/login.html). Login using the email and password of user document you added to the users table.
5. You will be redirected to a messages.html page on successful login. It will have all messages received from the contact form.

