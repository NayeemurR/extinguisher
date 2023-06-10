import "./AddClass.css";
import Axios from "axios";
import RawClass from "./types";
import { useState } from "react";
import {
  Grid,
  GridItem,
  Button,
  Alert,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { longToIndex, shortToLong } from "./objects";

interface AddClassProps {
  onAddClass: (newClass: RawClass) => void;
  onRemoveReqNeeded: (hassType: string) => void;
}

const AddClass = ({ onAddClass, onRemoveReqNeeded }: AddClassProps) => {
  const [classNumber, setClassNumber] = useState("");
  const [alert, setAlert] = useState(false);

  const hideAlert = () => {
    setAlert(false);
  };

  // function to add a class that user has taken
  const addAClass = () => {
    Axios.post("http://localhost:3000/addClass", {
      no: classNumber,
    }).then((response) => {
      // if the response returns a message, then raise an alert
      if (response.data.message) {
        setAlert(true);
      } else {
        var oldData = JSON.parse(
          localStorage.getItem("classesTaken") as string
        );
        // ensure this class isn't already in the classesTaken database
        if (!oldData.some((item: RawClass) => item.no == response.data.no)) {
          // add this class to classesTaken
          oldData.push(response.data);
          localStorage.setItem("classesTaken", JSON.stringify(oldData));

          var reqsFilled = JSON.parse(
            localStorage.getItem("reqsSoFar") as string
          );

          var hassType: string = "";
          // update reqsFilled accordingly (note a CI-HW class is also a CI-H class)
          if (response.data["cw"]) {
            hassType = "cw";
            reqsFilled[longToIndex["CI-H"]] += 1;
          }
          Object.entries(shortToLong).forEach(([key, value]) => {
            if (response.data[key]) {
              hassType = key;
              reqsFilled[longToIndex[value]] += 1;
            }
          });
          localStorage.setItem("reqsSoFar", JSON.stringify(reqsFilled));

          onAddClass(response.data);
          onRemoveReqNeeded(hassType);
        }
      }
    });
  };

  return (
    <div className="addClassContainer">
      {alert && (
        <div className="alertContainer">
          <Alert status="error">
            <AlertIcon />
            We couldn't find this class
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={hideAlert}
            />
          </Alert>
        </div>
      )}
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
          <Button bg="purple.100" onClick={addAClass}>
            Add
          </Button>
        </GridItem>
      </Grid>
    </div>
  );
};

export default AddClass;
