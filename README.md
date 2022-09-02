# Ski Trip Planner

A web application designed to help you plan your upcoming ski trips with helpful resources, resort reviews, and trip organization functionality

## Project Requirements

1. Have at least two data entities
2. Display a one:many or many:many relationship (embedded or referenced)
3. Use OAuth authentication
4. Implement basic authorization that restricts access to features that require a logged in user by protecting those routes from anonymous users using the isLoggedIn middleware
5. Edit and deletion of data can only be done by the user that created the data
6. Develop a full-CRUD data operation
7. Deployed on Heroku

## Technologies Used:

- JavaScript
- Node js
- Express
- Mongoose
- MongoDB
- OAuth
- Google People API
- Heroku

## Getting Started:

[Link to app](https://ski-planner-2.herokuapp.com/)

[Link to Trello](https://trello.com/b/AzrYyyFy/project-2-ski-planner)

## App Screenshots:

Below: This view shows a list of all potential ski trips created by a user

![A screenshot showing all trips pertaining to a user](images/all-resorts.png)

Below: This page renders input fields allowing the user to create a new ski trip

![Input fields to create a new ski trip](images/add-resort.png)

Below: This page showcases additional details associated with the trip which are not displayed on the "All-Resorts" page (e.g, amount budgeted). Here, the user has the ability to either add a review for the resort or see previous reviews from other users. A user may delete a review if they were the one who created it.

![Details page to showcase additional information about the trip and see/add reviews](images/details.png)

Below: A user may update the information they inputed regarding a planned ski trip by clicking on a hyperlink. In this example, a new input field will appear and allow the user to select a different start date for this trip.

![A screenshot showing player 1's victory through elimination of player 2's possible moves!](images/update.png)

## Next steps:

- [Link to Github Repository](https://github.com/georgeperryv/Project_2_SkiResort-Planner)
- Further develop the design layout
- Add helpful resources for researching ski resorts to the resources page
- Link to a Google Calendar API that allows a user to sync their trips to their personal calendar

## Other sources:

- [Psuedocode Google Sheets Link](https://docs.google.com/document/d/1FbWRw0gCfQjVgFh1uhNTGq_Qw5s3QujQxh4pUrToHSw/edit)

- [Wireframe: Website Layout](https://whimsical.com/project-2-ski-planner-s9vXe2NJzEB9QgMaPhsQb)

- Sources: Occasionally referenced Stack Overflow, MDN, W3 School, https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript#:~:text=Use%20new%20Date()%20to,the%20current%20date%20and%20time.&text=This%20will%20give%20you%20today's,to%20whatever%20format%20you%20wish.
