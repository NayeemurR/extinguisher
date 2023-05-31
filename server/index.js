const express = require("express");
const fetch = require("node-fetch");
const fs = require("fs");

const app = express();
const PORT = 3000;

const URL = "https://fireroad-dev.mit.edu/courses/all?full=true";

function parseTimeslot(day, slot) {
  // Implementation of parseTimeslot function
}

function parseSection(section) {
  // Implementation of parseSection function
}

function parseSchedule(course) {
  // Implementation of parseSchedule function
}

function parseAttributes(course) {
  // Implementation of parseAttributes function
}

function parseTerms(course) {
  // Implementation of parseTerms function
}

function getCourseData(course) {
  const courseCode = course.subject_id;
  const courseName = course.title;
  const courseHassType = course.hass_attribute;
}

function run() {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      // only keep courses that have "hass_attribute" field
      data = data.filter((course) => course.hass_attribute);
      console.log(data);
    })
    .catch((error) => {
      console.log("Error fetching data:", error);
    });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  run();
});
