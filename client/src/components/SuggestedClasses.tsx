import "./SuggestedClasses.css";
import Axios from "axios";
import { useState, useEffect } from "react";
import TakenClass from "./types";
import RawClass from "./types";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const SuggestedClasses = () => {
  const [reqsNeeded, setReqsNeeded] = useState<TakenClass[]>([]);
  const mapping: Record<number, string> = {
    0: "HASS-H",
    1: "HASS-A",
    2: "HASS-S",
    3: "HASS-E",
    4: "CI-H",
    5: "CI-HW",
  };
  const shortHandMapping: Record<string, string> = {
    "HASS-H": "hh",
    "HASS-A": "ha",
    "HASS-S": "hs",
    "HASS-E": "he",
    "CI-H": "ci",
    "CI-HW": "cw",
  };

  localStorage.setItem("requirements_satisfied", "[1, 1, 1, 1, 2]");
  const requirements_satisfied = JSON.parse(
    localStorage.getItem("requirements_satisfied") as string
  );

  var reqs_filled = JSON.parse(
    localStorage.getItem("requirements_filled") as string
  );

  if (localStorage.getItem("requirements_filled") == null) {
    localStorage.setItem("requirements_filled", "[0, 0, 0, 0, 0]");
  }

  var old_data = JSON.parse(localStorage.getItem("classesTaken") as string);
  const newReqsNeeded: RawClass[] = [];

  useEffect(() => {
    console.log(
      "reqs filled",
      reqs_filled,
      "requirements needed:",
      requirements_satisfied
    );
    for (var i = 0; i < requirements_satisfied.length; i++) {
      if (reqs_filled[i] < requirements_satisfied[i]) {
        var j = 0;
        while (j < requirements_satisfied[i] - reqs_filled[i]) {
          Axios.get("http://localhost:3000/getClass", {
            params: {
              hassType: shortHandMapping[mapping[i]],
            },
          }).then((response) => {
            console.log("received", response.data);
            if (
              response.data &&
              !newReqsNeeded.some(
                (item: RawClass) => item.no === response.data.no
              ) &&
              !old_data.some((item: RawClass) => item.no === response.data.no)
            ) {
              newReqsNeeded.push(response.data);
              setReqsNeeded([...reqsNeeded, ...newReqsNeeded]);
            } else {
              j--;
            }
          });
          j++;
        }
      }
    }
  }, []);

  return (
    <div className="suggestedClassesContainer">
      <h4 className="card-header">Suggested Classes</h4>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Num.</Th>
              <Th>Rating</Th>
              <Th>Subject</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reqsNeeded.map((req: RawClass) => {
              let content;
              if (req.hh) {
                content = "HASS-H";
              } else if (req.ha) {
                content = "HASS-A";
              } else if (req.hs) {
                content = "HASS-S";
              } else if (req.he) {
                content = "HASS-E";
              } else if (req.ci) {
                content = "CI-H";
              } else if (req.cw) {
                content = "CI-HW";
              }
              return (
                <Tr>
                  <Td>{req.no}</Td>
                  <Td>{req.ra}</Td>
                  <Td>{content}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SuggestedClasses;
