const express = require("express");
const cors = require("cors");
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors());
const fs = require("fs");

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
          res.json({ message: "Class not found" });
        } else {
          res.json(classTaken);
        }
      } catch (error) {
        res.status(500).json({ error: "Failed to parse JSON data" });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
