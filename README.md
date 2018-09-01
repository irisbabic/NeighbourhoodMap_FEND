

## Table of Contents

- [Overview](#overview)
- [How to install](#how-to-install)
- [Goal](#goal)
- [APIs](#apis)

#Overview
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
It was made as part of a FEND course. The purpose od the app is to show some destinations in neighborhood and to allow
users to search through them and see additional info about clicked destination.

#How to install
Install dependencies using `npm install` and start npm server by running `npm start` command.
Additionally you might have to install RegExp by running `npm install --save escape-string-regexp`

#Goal
The goal of this application is to use all knowledge from FEND course to make a accessible, responsive application using React
and different APIs.

#APIs
- MAP - Maps JavaScript API (https://developers.google.com/maps/documentation/javascript/tutorial)
- FETCHING INFO - FETCH API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- INFO - HERE GEOCODING API (https://developer.here.com/documentation/geocoder/topics/what-is.html)

#Service Worker
For this project default React service worker was used and it works only in production mode.
To build the app use `npm run build` and open <strong>http://localhost:3000</strong> in your browser.