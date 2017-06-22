# personal-portfolio
A simple one-page personal portfolio with a backend to handle messages sent from the contact form

## Steps to run the app locally
Assuming you have >= Node.js v6.10.2 and Git CLI installed, these steps executed successfully in order will setup the app on your local system. Link to download Node and Git CLI are in the Appendix section.
1. Run `git clone https://github.com/puranik3/personal-portfolio` from the terminal (command line)
2. `cd personal-portfolio`
3. `npm install`
4. `npm start`
Now you can view the portfolio page in a browser by visiting the URL [https://localhost:3000/portfolio.html](https://localhost:3000/portfolio.html)

To be able to submit messages and view them you need a Mongo DB instance running. Assuming you have installed Mongo DB, follow these steps for setup. Link to download Mongo DB is in the Appendix section.
1. Run `mongod` from the another terminal
2. Run `mongo` (Mongo DB client) from yet another terminal. Add a user document to a `users` collection with an email and password field. Each of these are string-valued. Remember them for future use. Check Mongo DB docs for details.
3. Fill the contact form in the portfolio page and submit.
4. To view the submitted messages, open [https://localhost:3000/login.html](https://localhost:3000/login.html). Login using the email and password of user document you added to the users table.
5. You will be redirected to a messages.html page on successful login. It will have all messages received from the contact form.

## Accessing the app online
The app is hosted on Heroku. The following links help access it.
1. The portfolio page can be accessed at [https://personal-portfolio-page.herokuapp.com/portfolio.html](https://personal-portfolio-page.herokuapp.com/portfolio.html)
2. The messages submitted using the contact form can be logged in and accessed. Login page is [https://personal-portfolio-page.herokuapp.com/login.html](https://personal-portfolio-page.herokuapp.com/login.html). The credentials for the registered user are email: puranik@digdeeper.in, password: test123. Upon login you will be redirected to the messages page with list of submitted messages.

## Appendix
Here are links to download required platforms/tools. Installation is quite simple (usually single click install).
1. Node.js: https://nodejs.org/en/download/
2. Mongo DB (Community server): https://www.mongodb.com/download-center#community
3. Git CLI: https://git-scm.com/downloads
