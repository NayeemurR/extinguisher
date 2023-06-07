import "./ClassesTaken.css";
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

const ClassesTaken = () => {
  const shortHandMapping = {
    hh: "HASS-H",
    ha: "HASS-A",
    hs: "HASS-S",
    he: "HASS-E",
    ci: "CI-H",
    cw: "CI-HW",
  };

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
            {/* {classesTaken.map((classTaken: TakenClass) => { */}
            {classesTaken.map((classTaken: RawClass) => {
              let content;
              if (classTaken.hh) {
                content = shortHandMapping.hh;
              } else if (classTaken.ha) {
                content = shortHandMapping.ha;
              } else if (classTaken.hs) {
                content = shortHandMapping.hs;
              } else if (classTaken.he) {
                content = shortHandMapping.he;
              } else if (classTaken.ci) {
                content = shortHandMapping.ci;
              } else if (classTaken.cw) {
                content = shortHandMapping.cw;
              }

              return (
                <Tr>
                  <Td>{classTaken.no}</Td>
                  <Td>{classTaken.ra}</Td>
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

export default ClassesTaken;
