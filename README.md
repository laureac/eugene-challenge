# Eugene's full stack developer challenge
Welcome to the coding challenge. We use this challenge to help guide our technical interview. Things to keep in mind before you start:
- Please don't spend more than 4 hours on this project, if you're getting stuck on something then feel free to skip it and we can chat through it during the interview.
- Don't go overboard with UI.
- Import whatever libraries you need, but be prepared to explain why you imported them and what they're doing for you.
- Feel free to make changes to both the Front End or API to complete the task.

# First things first, how to run this project.
This project is written in Typescript and uses Parcel.js to build. There is an Express server for the API. Yarn is the package manager and there are already start scripts that will get you going. **Don't fork this project, clone it and create your own project on Github**. You can either make it a public repo or if you need it to be private, let us know and we'll send you our github usernames to invite as collaborators.

# OK, so what are we doing?
Your mission is to display the list of appointments within the data.json file on the screen. The appointments must be:
- Fetched from the API @ http://localhost:9000/appointments.
- Displayed with the name of the patient, start date, start time, duration, and clinician name.
- Grouped either by appointment day or by clinican name depending on what the user selects from a dropdown.
- Ordered by start date.
- Highlight any appointment that is greater than 1 hour in duration.
- Add APIs to server.ts for adding and removing appointments (in memory only, no need to modify the data.json file or use a DB)
- Add a UI to add or remove appointments. For adding appointments, feel free to add random/dummy data rather than spend too much time building a form.