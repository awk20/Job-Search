# Job Search Application

This project is being used as a place for me to learn API usage in React as well as as a way to search for job openings based on keyword searches. This application uses the Adzuna API to look through job listings and present the user with a list of jobs containing the entered keywords. Click the green text on each job listing to reach the site it is located at. Can now also set jobs to parttime and fulltime as well as search based on a minimum slaary requirement.
this project is still in development.

## Getting Application Running on Your Machine

To run the app, you need to create an account with Adzuna to access their API. Then take your API KEY and API ID and replace "YOUR_API_ID" and "YOUR_API_KEY" in `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=YOUR_API_ID3&app_key=YOUR+API_KEY&results_per_page=30&what=${searchTerms}' with the API Key and API ID given to you by Adzuna when you sign up on their site. This allows you to fetch data from their job listings API.

## Run the project with: `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
