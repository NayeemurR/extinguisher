const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 3000;
const ClassModel = require("./models/Class");
app.use(express.json());
app.use(cors());
const fs = require("fs");

mongoose.connect(
  "mongodb+srv://nayeem3156:1fyo8Ja9v1e6g7My@hassclasses.y3l3tk1.mongodb.net/hass_classes?retryWrites=true&w=majority"
);

// GET request to return a class with a certain hass_attribute and/or communication_requirement
app.get("/getClass", async (req, res) => {
  const hassType = req.query.hassType;
  fs.readFile(
    "/Users/nayeemurrahman/Documents/Projects/extinguisher/server/scrapers/combined.json",
    (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to read JSON file" });
      }
      try {
        const jsonData = JSON.parse(data);

        // Access the desired object based on the provided key
        const entries = Object.entries(jsonData);
        for (let i = 0; i < entries.length; i++) {
          if (entries[i][1][hassType]) {
            res.json(entries[i][1]);
            break;
          }
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to parse JSON data" });
      }
    }
  );
});

// POST request to add a class taken
app.post("/addClass", async (req, res) => {
  const no = req.body.no;
  // find this class in server/scrapers/combined.json
  fs.readFile(
    "/Users/nayeemurrahman/Documents/Projects/extinguisher/server/scrapers/combined.json",
    (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to read JSON file" });
      }

      try {
        const jsonData = JSON.parse(data);

        // Access the desired object based on the provided key
        const classTaken = jsonData[no];

        if (!classTaken) {
          return res.status(404).json({ error: "Object not found" });
        }
        // Send the retrieved object as a response
        res.json(classTaken);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to parse JSON data" });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
