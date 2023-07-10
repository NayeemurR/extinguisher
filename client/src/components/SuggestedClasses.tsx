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

  const formatContent = (classTaken: RawClass): string => {
    const fields = [];
    if (classTaken.hh) fields.push("HASS-H");
    if (classTaken.ha) fields.push("HASS-A");
    if (classTaken.hs) fields.push("HASS-S");
    if (classTaken.he) fields.push("HASS-E");
    if (classTaken.ci) fields.push("CI-H");
    if (classTaken.cw) fields.push("CI-HW");

    if (fields.length > 0) {
      return fields.join(" / ");
    } else {
      return "";
    }
  };

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
              const content = formatContent(req);
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
