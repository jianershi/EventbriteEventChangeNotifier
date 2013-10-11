Eventbrite Event Change Notifier
======================
Notifies you when an orgnizer of the event made any modifications to the event and notifies you through SMS

The API uses ```modified``` attribute in the Eventbrite API

The script is written in [node.js](http://nodejs.org/)

## Install
```npm install```
## API Keys
Fill in ```apiconfig.sample.js``` and rename it to ```apiconfig.js```. You will need twilio and eventbrite API keys. Notice the interval is set to check every 2 mins. Eventbrite API has limit of 1k request/day.

## Run
```node app.js```

It is meant to be run in the background, so a better way maybe
```screen -dmS "Eventbrite Monitor" node app.js```