import "./AddClass.css";
import Axios from "axios";
import TakenClass from "./types";
import { useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

const AddClass = () => {
  const mapping: Record<string, number> = {
    "CI-H": 0,
    "CI-M": 1,
    "HASS-S": 2,
    "HASS-H": 3,
    "HASS-A": 4,
  };
  const [classNumber, setClassNumber] = useState("");

  // function to add a class to the local storage database
  const addAClass = () => {
    Axios.post("http://localhost:3000/addClass", {
      subject_id: classNumber,
    }).then((response) => {
      if (localStorage.getItem("classesTaken") == null) {
        localStorage.setItem("classesTaken", "[]");
      }
      var old_data = JSON.parse(localStorage.getItem("classesTaken") as string);
      // ensure this class isn't already in the local storage database
      if (
        !old_data.some(
          (item: TakenClass) => item.subject_id == response.data.subject_id
        )
      ) {
        // add this class to the local storage database "classesTaken"
        old_data.push(response.data);
        localStorage.setItem("classesTaken", JSON.stringify(old_data));

        if (localStorage.getItem("requirements_filled") == null) {
          localStorage.setItem("requirements_filled", "[0, 0, 0, 0, 0]");
        }
        // update the requirements filled in local storage
        var reqs_filled = JSON.parse(
          localStorage.getItem("requirements_filled") as string
        );
        reqs_filled[mapping[response.data.hass_attribute]] += 1;

        if (response.data.communication_requirement) {
          reqs_filled[mapping[response.data.communication_requirement]] += 1;
        }

        localStorage.setItem(
          "requirements_filled",
          JSON.stringify(reqs_filled)
        );
      }
    });
  };

  return (
    <div className="addClassContainer">
      <Grid templateColumns="repeat(3, 1fr)" gap={3}>
        <GridItem>
          <label className="addClassLabel">Add Class</label>
        </GridItem>
        <GridItem>
          <Input
            variant="flushed"
            placeholder="Class Number"
            onChange={(event) => {
              setClassNumber(event.target.value);
            }}
          />
        </GridItem>
        <GridItem>
          <button
            type="button"
            className="btn btn-outline-info addClassButton"
            onClick={addAClass}
          >
            Add
          </button>
        </GridItem>
      </Grid>
    </div>
  );
};

export default AddClass;
