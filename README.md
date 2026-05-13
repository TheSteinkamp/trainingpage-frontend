# TrainingPage frontend

## Description 

A fitness application built with multiple microservices to help you with planning, logging and improving your home training.
The system is a microservice application built with Spring Boot, React, and PostgreSQL and containerized using Docker for easy setup and deployment.

The Frontend is a responsive web application built with React. It provides an interface for users to manage their fitness journey.
The frontend does not communicate directly with individual microservices, instead it sends all requests to the Gateway Service, which handles authentication and routing.


## Technology stack

* React 18 (Vite-powered)
* React Bootstrap (For responsive UI components)
* Axios (For API communication)
* React Router (For navigation)
* Context API (For global state management, such as Auth)
* CSS (Custom styling)
  

## Key Components & Architecture

AuthContext: Manages user login state and JWT storage (Local Storage).

PrivateRoutes: Protects sensitive pages, ensuring only logged-in users can access statistics and training logs.

Responsive Design: Optimized for both desktop and mobile use using Bootstrap's grid system.


## Setup

This service is designed to be run as part of the Docker Compose cluster.
For instructions on how to start the project go to the readme file at [trainingpage](https://github.com/TheSteinkamp/trainingpage.git)
