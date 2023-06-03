interface TakenClass {
  rating: number;
  has_final: boolean;
  description: string;
  offered_fall: boolean;
  offered_spring: boolean;
  meets_with_subjects: string[];
  instructors: string[];
  joint_subjects: string[];
  out_of_class_hours: number;
  total_units: number;
  related_subjects: string[];
  communication_requirement: string;
  hass_attribute: string;
  pdf_option: boolean;
  in_class_hours: number;
  is_half_class: boolean;
  level: string;
  url: string;
  subject_id: string;
  title: string;
  lab_units: number;
  design_units: number;
  public: boolean;
  offered_summer: boolean;
  lecture_units: number;
  preparation_units: number;
  enrollment_number: number;
  is_variable_units: boolean;
  offered_IAP: boolean;
}

export default TakenClass;
