const mongoose = require("mongoose");

const TakenClassesSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  rating: Number,
  has_final: Boolean,
  description: String,
  offered_fall: Boolean,
  offered_spring: Boolean,
  meets_with_subjects: [String],
  instructors: [String],
  joint_subjects: [String],
  out_of_class_hours: Number,
  total_units: Number,
  related_subjects: [String],
  communication_requirement: String,
  hass_attribute: String,
  pdf_option: Boolean,
  in_class_hours: Number,
  is_half_class: Boolean,
  level: String,
  url: String,
  subject_id: String,
  title: String,
  lab_units: Number,
  design_units: Number,
  public: Boolean,
  offered_summer: Boolean,
  lecture_units: Number,
  preparation_units: Number,
  enrollment_number: Number,
  is_variable_units: Boolean,
  offered_IAP: Boolean,
});

const TakenClassesModel = mongoose.model("taken_classes", TakenClassesSchema);
module.exports = TakenClassesModel;
