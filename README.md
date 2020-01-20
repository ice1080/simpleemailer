# Simple Emailer App

## Installing and Running the app
* clone the repo and navigate to it
* download npm if necessary
  * npmjs.com/get-npm
* `npm i`
* `export MAILGUN_API_KEY=<your-mailgun-api-key>`
* `export MAILGUN_DOMAIN=<your-mailgun-domain>`
* `export SENDGRID_API_KEY=<your-sendgrid-api-key>`
* `npm run build`
* `npm run app`


## Using the frontend
For ease of use, a simple frontend to talk to the app from the browser also starts with the above command. Follow the below to use this:
* navigate your browser to localhost:3000


## Changing Email Provider
* By default, the email provider is Mailgun. To change the provider, open up config.js, and switch the emailSender value to `'sendgrid'`.
  * If the emailSender value is removed, the app will still default to Mailgun.
  * If an unrecognized value is placed in there, the app will not work.


## Unit Tests
to run the unit tests:
* `npm i` (if not completed already)
* `./node_modules/.bin/jest`


## Framework and Language
* I chose javascript for the language and express for the framework, only because I am most familiar with express for starting an application from scratch. I do not usually prefer javascript because it is not a very powerful language and not exactly an Object Oriented language. I don't often create projects from scratch and I knew this would allow me to work on the details of the project faster.


## Additional Notes
* I would have normally spent more time converting the body to plain text to make the email a bit nicer, but new lines were simple to use and make the body at least a bit more human readable.
* I didn't spend any time styling the front end, since appearance is not what we're going for here.
* I would have preferred to add a logger if I had more time.
* For the internal code, I did not add much documentation. I believe that well named methods and variables help reduce the chance of stale comments. I also recognize this is not always the most accepted position and am willing to change my position if I hear a good argument otherwise.
* It would not take much to update this app to be able to live-switch over to the other service provider. Since the app requirements stated that this should be handled by a configuration change and redeploy of the service", I did not pursue this

