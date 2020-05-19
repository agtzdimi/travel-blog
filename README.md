# TravelBlog

The main idea of the project is to showcase information of different landmark buildings

## Summary

The application contains 2 different modes:

- _admin mode_
- _guest mode_

Based on the mode the user can either view or edit/view the landmarks.
The application contains 3 pages to guide through the user

- The Login page to access the application
- The Home page visualizing the list of all landmarks registered in the application
- The Landmark Detail page which will be rendered whenever a user selects a landmark building in the home page

## Installation

The TravelBlog project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.5.

### Prerequisites

To utilize the TravelBlog application a MongoDB and a Parse server (NodeJS/ExpressJS) should been already installed.
The referenced server implementation can be found in:[Landmarks Server](https://github.com/agtzdimi/landmarks-server)

Also Node.JS and Angular CLI should also been installed before starting the application

### Installation steps

To install the application the following steps should be executed:

- `git clone https://github.com/agtzdimi/travel-blog` (Or download the zip file from the repo)
- At the project root run `npm i`
- To start the application: `npm start`

## Acknowledgments

- To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
- Akveo Team for [Nebular Library](https://akveo.github.io/nebular/)
- Mapbox team for the open source maps [Link](https://docs.mapbox.com/mapbox-gl-js/api/)
