# SAE-S4 : COVID-19 Data Analaysis Project
## Introduction

This project is a web-based data analysis application that allows the users to visualize graphs about a European database containing recent COVID-19 data from all European countries. 
It was built using data extraction in Python, Node.js, Vue.js and includes a number of third-party libraries for data visualization and analysis such as JSCharting.

## Installation

To run this project locally, follow these steps:
1. Clone the repository to your local machine:
```bash
git clone https://github.com/mcrayssac/SAE-S4.git
```
2. Install the necessary dependencies for the front-end (Vue.js) and back-end (Node.js) components. Open two terminal
windows, one for the front-end and one for the back-end, and navigate to the root directory of each.
```bash
# Front-end dependencies
cd API
npm install

# Back-end dependencies
cd vuejs
npm install
```
3. Create a `.env` in the `API` directory with the following environment variables:
```bash
PORT = 3000
LOCALHOST_PORT = "http://localhost:8080"
```
4. Make sure to first load the data in the `API` directory (you will not be able to see anything without doing this, it might take a while but our lovely project leader had too much time to spare and made a timer that estimate how much time it would take you to load the data):
```bash
# Load data 
cd API
npm run start

# launch web server (in another terminal)
cd vuejs
npm run serve
```
If the data is already loaded, it should tell you that you `All your files are up to date !
`, but if for some reason you want to force and reload all the data, go to `API` and do: 
```bash
# Force data refresh
npm run start_update
```
*You can do the same thing with the top right button in the app*

5. Open a browser and navigate to **'http://localhost:8080'** to view the application.

That's it! 