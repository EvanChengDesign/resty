# RESTy

RESTy API testing application

### Phase 1 Requirements

Today, we begin the first of a 4-Phase build of the RESTy application, written in React. In this first phase, our goal is to setup the basic scaffolding of the application, with intent being to add more functionality to the system as we go. This initial build sets up the file structure so that we can progressively build this application in a scalable manner.

#### Phase 1: Application Setup

1. Basic React Application
2. Scaffolding
3. Basic State
4. Rendering

#### Phase 1 UML

![UML](./images/RESTy%20UML%201.png)

### Phase 2 Requirements

RESTy Phase 2: Retrieving User Input and Managing State.  
In phase 2, we will be receiving user input in preparation of connecting to live APIs, using the useState() hook in our functional components. In order to properly manage state with the useState hook, we will now convert <App /> to a functional component.

The following user stories detail the major functionality for this phase of the project.

As a user, I want to enter the REST Method and URL to an API.
As a user, I want to see a summary of my request as well as results returned from an API request in my browser in a readable format.
Application Flow:

• User enters an API URL.  

• Chooses a REST Method.  

• Clicks the “Go” button.  

• Application fetches data from the URL given, with the method specified.  

• Displays the response headers and results separately.  

• Both headers and results should be “pretty printed” JSON.

#### Phase 2: Testing and Deployment

1. Testing of React components and applications
2. Uses best practices for testing Behaviors and Acceptance Criteria
3. Integrates with an online CI framework
4. Deploy to GitHub Pages, Netlify, and/or AWS

### Phase 3: Component Lifecycle / UseEffect Hook  

Connect RESTy with APIs, running live requests.

#### Phase 3 Requirements:

In phase 3, we will be connecting RESTy to live APIs, fetching and displaying remote data. Our primary focus will be to service GET requests.

The following user stories detail the major functionality for this phase of the project.

As a user, I want to enter the URL to an API and issue a GET request so that I can retrieve it’s data.  

As a user, I want to see the results returned from an API request in my browser in a readable format.  

#### Application Flow:

* User enters an API URL.
* Chooses a REST Method.
* Clicks the “Go” button.
* Application fetches data from the URL given, with the method specified.
* Displays the response headers and results separately.
* Both headers and results should be “pretty printed” JSON.

### Phase 4: Advanced State with Reducers: Tracking History

#### Phase 4 Requirements:
In phase 4, we will be tracking every API call and storing it in history.

The following user stories detail the major functionality for this phase of the project.

As a user, I want to see a list of my previous API calls, so that I can see the results again, quickly.
Application Flow:

* User enters an API URL.
* Chooses a REST Method.
* Clicks the “Go” button.
* Application fetches data from the URL given, with the method specified.
* Application stores the API request and returned data into state.
* Updates the list of previous API calls.
* Application Displays the response headers and results separately.
* Both headers and results should be “pretty printed” JSON.
