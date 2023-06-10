import "./ClassesTaken.css";
import RawClass from "./types";
import { longToIndex, longToShort, shortToLong } from "./objects";
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
  onAddReqNeeded: (hassType: string) => void;
}

const ClassesTaken = ({ onDeleteClass, onAddReqNeeded }: ClassesTakenProps) => {
  let storageClassesTaken = JSON.parse(
    localStorage.getItem("classesTaken") as string
  );

  const handdleDeleteClass = (index: number, content: string) => {
    // update classesTaken
    const updatedClassesTaken = [...storageClassesTaken];
    updatedClassesTaken.splice(index, 1);
    localStorage.setItem("classesTaken", JSON.stringify(updatedClassesTaken));
    // update reqsSoFar
    const reqsSoFar = JSON.parse(localStorage.getItem("reqsSoFar") as string);
    reqsSoFar[longToIndex[content]] -= 1;
    localStorage.setItem("reqsSoFar", JSON.stringify(reqsSoFar));

    const hassType = longToShort[content];
    onAddReqNeeded(hassType);
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
              let content = "";
              if (classTaken.hh) {
                content = shortToLong.hh;
              } else if (classTaken.ha) {
                content = shortToLong.ha;
              } else if (classTaken.hs) {
                content = shortToLong.hs;
              } else if (classTaken.he) {
                content = shortToLong.he;
              } else if (classTaken.ci) {
                content = shortToLong.ci;
              } else if (classTaken.cw) {
                content = shortToLong.cw;
              }
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
                        handdleDeleteClass(index, content);
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
