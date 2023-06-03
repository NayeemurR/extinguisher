const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 3000;
const ClassModel = require("./models/Class");
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://nayeem3156:1fyo8Ja9v1e6g7My@hassclasses.y3l3tk1.mongodb.net/hass_classes?retryWrites=true&w=majority"
);

// POST request to add a class taken
app.post("/addClass", async (req, res) => {
  const subject_id = req.body.subject_id;
  const classTaken = await ClassModel.findOne({
    subject_id: subject_id,
  });

  res.json(classTaken);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
