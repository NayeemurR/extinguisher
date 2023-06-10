import "./SuggestedClasses.css";
import Axios from "axios";
import { useEffect } from "react";
import RawClass from "./types";
import { indexToLong, longToShort } from "./objects";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

interface SuggestedClassesProps {
  classesTaken: RawClass[];
  reqsNeeded: RawClass[];
  onUpdateReqsNeeded: (newReqsNeeded: RawClass[]) => void;
}

const SuggestedClasses = ({
  classesTaken,
  reqsNeeded,
  onUpdateReqsNeeded,
}: SuggestedClassesProps) => {
  const reqsSoFar = JSON.parse(localStorage.getItem("reqsSoFar") as string);
  const reqsComplete: number[] = [1, 1, 1, 1, 2];
  const newReqsNeeded: RawClass[] = [];

  useEffect(() => {
    // suggest classes based on which requirements are not yet fulfilled
    for (var i = 0; i < reqsComplete.length; i++) {
      if (reqsSoFar[i] < reqsComplete[i]) {
        var j = 0;
        while (j < reqsComplete[i] - reqsSoFar[i]) {
          Axios.get("http://localhost:3000/getClass", {
            params: {
              hassType: longToShort[indexToLong[i]],
            },
          }).then((response) => {
            if (
              response.data &&
              !newReqsNeeded.some(
                (item: RawClass) => item.no === response.data.no
              ) &&
              !classesTaken.some(
                (item: RawClass) => item.no === response.data.no
              )
            ) {
              newReqsNeeded.push(response.data);
              onUpdateReqsNeeded(newReqsNeeded);
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
        <Table variant="striped" colorScheme="purple">
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
