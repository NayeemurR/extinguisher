import "./AddClass.css";
import Axios from "axios";
import RawClass from "./types";
import { useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

const AddClass = () => {
  const mapping: Record<string, number> = {
    "HASS-H": 0,
    "HASS-A": 1,
    "HASS-S": 2,
    "HASS-E": 3,
    "CI-H": 4,
    "CI-HW": 5,
  };
  const shortHandMapping = {
    hh: "HASS-H",
    ha: "HASS-A",
    hs: "HASS-S",
    he: "HASS-E",
    ci: "CI-H",
    cw: "CI-HW",
  };

  const [classNumber, setClassNumber] = useState("");

  // function to add a class to the local storage database
  const addAClass = () => {
    Axios.post("http://localhost:3000/addClass", {
      no: classNumber,
    }).then((response) => {
      if (localStorage.getItem("classesTaken") == null) {
        localStorage.setItem("classesTaken", "[]");
      }
      var oldData = JSON.parse(localStorage.getItem("classesTaken") as string);
      // ensure this class isn't already in the local storage database
      if (!oldData.some((item: RawClass) => item.no == response.data.no)) {
        // add this class to the local storage database "classesTaken"
        oldData.push(response.data);
        localStorage.setItem("classesTaken", JSON.stringify(oldData));

        if (localStorage.getItem("requirements_filled") == null) {
          localStorage.setItem("requirements_filled", "[0, 0, 0, 0, 0]");
        }
        // update the requirements filled in local storage
        var reqsFilled = JSON.parse(
          localStorage.getItem("requirements_filled") as string
        );

        // a CI-HW class is also a CI-H class
        if (response.data["cw"]) {
          reqsFilled[mapping["CI-H"]] += 1;
        }
        Object.entries(shortHandMapping).forEach(([key, value]) => {
          if (response.data[key]) {
            reqsFilled[mapping[value]] += 1;
          }
        });

        localStorage.setItem("requirements_filled", JSON.stringify(reqsFilled));
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
