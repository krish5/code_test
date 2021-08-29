## Introduction

Application to display races for gamling. App is developed on react js and bootstrap. It is done as part of coding challenge conducted by Entain.
https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=10 - used this to fetch sample data for displaying races.

## Pre requisites 

Install node
Install git

## Steps to do

1. git clone https://github.com/krish5/code_test.git
2. git checkout master
3. npm install
4. npm start


Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Application Details

A user should see 5 races at all times, and they should be sorted by time ascending(considering that data comes in ascending order from API).  Race should disappear from the list after 1 min past the start time (​advertised_start).

User should see meeting name (​meeting_name), race number (​race_number) and countdown timer that indicates the start of the race. User should be able to toggle race categories to view races belonging to only the selected category.

Categories are defined by IDs and are the following.
1. Greyhound racing: category_id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61'
2. Harness racing: category_id: '161d9be2-e909-4326-8c2c-35ed71fb460b'
3. Horse racing: category_id: '4a2788f8-e825-4d36-9894-efd4baf1cfae'

## Files to understand

Application starts from index.js which calls <App> component. <Racing/> component is called inside <App/> component. 
<Racing/> component display navigation between different categories of races. 
<Racing/> got <Timer/> component to display countdown timer for each race. 

constants.json file is used to declare constant data and can be used in the application elsewhere.
helper.js file is used to reduce the overhead of many function inside component file.



