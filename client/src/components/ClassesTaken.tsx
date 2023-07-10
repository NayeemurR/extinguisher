import "./ClassesTaken.css";
import RawClass from "./types";
import { longToIndex, longToShort } from "./objects";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

interface ClassesTakenProps {
  onDeleteClass: (index: number) => void;
  onAddReqNeeded: (hassType: string[]) => void;
}

const ClassesTaken = ({ onDeleteClass, onAddReqNeeded }: ClassesTakenProps) => {
  let storageClassesTaken = JSON.parse(
    localStorage.getItem("classesTaken") as string
  );

  const handleDeleteClass = (index: number, content: string[]) => {
    // update classesTaken
    const updatedClassesTaken = [...storageClassesTaken];
    updatedClassesTaken.splice(index, 1);
    localStorage.setItem("classesTaken", JSON.stringify(updatedClassesTaken));

    // update reqsSoFar (check for CI-HW) CI-HW is a CI-H, so REMOVE THAT
    const reqsSoFar = JSON.parse(localStorage.getItem("reqsSoFar") as string);
    var hassTypes: string[] = [];

    content.forEach((hassType) => {
      if (hassType === "CI-HW") {
        reqsSoFar[longToIndex["CI-H"]] -= 1;
        hassTypes.push(hassType);
      } else {
        reqsSoFar[longToIndex[hassType]] -= 1;
        hassTypes.push(longToShort[hassType]);
      }
    });

    localStorage.setItem("reqsSoFar", JSON.stringify(reqsSoFar));
    onAddReqNeeded(hassTypes);
  };

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
    <div className="classesTakenContainer">
      <h4 className="card-header">Classes Taken</h4>
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
            {storageClassesTaken.map((classTaken: RawClass, index: number) => {
              const content = formatContent(classTaken);
              return (
                <Tr>
                  <Td>{classTaken.no}</Td>
                  <Td>{classTaken.ra}</Td>
                  <Td>{content}</Td>
                  <Td>
                    <IconButton
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      size="sm"
                      onClick={() => {
                        onDeleteClass(index);
                        // send content as a list of strings split on " / "
                        handleDeleteClass(index, content.split(" / "));
                      }}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ClassesTaken;
