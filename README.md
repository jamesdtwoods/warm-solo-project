# _warm_ - solo project

## Description

_Duration: three weeks_

_**warm** (Winter Activities Resource Manager)_ is a mobile optimized web app created for people to track cold weather exercise and excursions. Each year when winter comes I find myself either over or under dresssed until I build up a mental log of what to wear and when. _**warm**_ takes the guess work out of proper layering by allowing people to create a closet of thier outdoor gear, get the current weather and filter previous entries by weather and activity types to see what they wore the last time out. 

## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [pg-pool](https://www.npmjs.com/package/pg-pool)
- [Postico](https://eggerapps.at/postico/v1.php) - or any other database client
- [Postgres](https://www.postgresql.org/) - or any other database manager
- [nodemon](https://www.npmjs.com/package/nodemon) - far from necessary, but a helpful tool to keep your server up to date with any js changes you make
- [React Bootstrap](https://react-bootstrap.netlify.app/) - or another sytling library


## Installation

1. Create a database named `your database name`,
2. The queries in the `tables.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage

1. Login/register for personalized cloting and activity storage
2. Build out your closet by adding all of the hats, gloves, jackets, ect. that you wear
3. Enter past activities, noting the weather, what clothes you wore and how you felt
4. Get the current weather conditions for any location
5. Search your activity log to see what you wore during similar conditions

## Future goals
* User specific clothing and activity types
* Allow users to add one another to see thier activities

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) (especially all the chefs in the Moonstone cohort and our most patient and thoughful instructor Matt) who gave me the tools and confidence to make this application a reality.

## Support
If you have suggestions or issues, you can find my contact information on my [LinkedIn profile](https://www.linkedin.com/in/james-d-t-woods/)
