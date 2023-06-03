import "./ClassesTaken.css";
import TakenClass from "./types";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const ClassesTaken = () => {
  if (localStorage.getItem("classesTaken") == null) {
    localStorage.setItem("classesTaken", "[]");
  }
  var classesTaken = JSON.parse(localStorage.getItem("classesTaken") as string);

  return (
    <div className="classesTakenContainer">
      <h4 className="card-header">Classes Taken</h4>
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
            {classesTaken.map((classTaken: TakenClass) => {
              return (
                <Tr>
                  <Td>{classTaken.subject_id}</Td>
                  <Td>{classTaken.rating}</Td>
                  <Td>{classTaken.hass_attribute}</Td>
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
