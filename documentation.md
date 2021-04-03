# Getting Started with Project Cars App

This is a react application for the client-side and it uses Firebase for the server-side.

## Authentication

For authentication is used Firebase.

## Database

The application communicate with Firebase via REST.

## Design

For the design of the application are used mostly bootstrap and react-bootstrap and for the custom css
styles of every component is used styled-jsx.

## Routing

For the routing is used react-router-dom.

## URL validation

To validate the urls is used valid-url.

## Source control system

For the source control system is used GitHub.

# Application Structure

The application has two parts - public and private.

## Public Part

The public part of the project contains login, signup and forgot password pages. They are visible
without authentication.

## Private Part(User Area)

The Private part contains the home page with all the created cars for the current user, details page for every car with list of the added parts for this car. The authenticated user can create cars, edit and delete them and also add parts to them. 

The parts section is separated on two others. The first one is for owned parts and the other one is for unowned parts. For every unowned part there is a button which says "Add to owned", so when it is clicked it will move the part from this list to the other one with owned parts. There is also a link to the shop for every part and a delete button.

# File structure

All the files are separated on different folders with proper names.

## Components

All the components are in the componenets folder.

### authComponents

In the authComponents folder are all of the components related with the user like Login, Signun etc.

### carComponents

There are all of the components for the cars and parts like CarCreate, CarEdit, CarDetails etc.

### coverPhotos

There is only one component with a custom background cover with cars which is used in some of the other components.

### Footer

Contains the footer component.

### Header

Contains the header component.

### homePageComponents

Contains the home page dashboard component with all the cars for the current user.

### notFoundComponent

There is the component for invalid routes saying "Page not found".

## contexts

### AuthContext

The AuthContext is available everywhere in the application so we know if there is a current user or not. Also here are functions related with the user like Login, Signup etc.

## services

### carsServices

Here are all of the functions communicating with the Database like getOneCar, createCar, deleteCar etc.

## styles

### colors

In this file there are all of the important colors used in the application.