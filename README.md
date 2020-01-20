# Simple Emailer App




## TODO
* configuration for sending to mailgun or sendgrid
* document the methods
* test install and usage by trying it out on other computer
* add to readme:
** how to install


## Later
* add actual logging



## Design Notes
* method for validation of incoming data
* method for conversion of html
* method to send the email
** abstract out the configuration part...
** perhaps a factory class to create a mail-sender
* method to get auth of email stuff
* start with simple html frontend




## Notes to include in the readme
* I would have normally spent more time converting the body to plain text to make the email a bit nicer, but new lines were simple to use and make the body at least a bit more human readable
* I didn't spend any time styling the front end, since appearance is not what we're going for here.
* to run the unit tests:
** npm i
** ./node_modules/.bin/jest