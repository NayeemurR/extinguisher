import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import RawClass from "./components/types";
import Banner from "./components/Banner";
import AddClass from "./components/AddClass";
import ClassesTaken from "./components/ClassesTaken";
import SuggestedClasses from "./components/SuggestedClasses";
import Axios from "axios";

function App() {
  const [classesTaken, setClassesTaken] = useState<RawClass[]>([]);
  const [reqsNeeded, setReqsNeeded] = useState<RawClass[]>([]);

  // initialize localStorage databases
  if (localStorage.getItem("classesTaken") == null) {
    localStorage.setItem("classesTaken", "[]");
  }

  if (localStorage.getItem("reqsSoFar") == null) {
    localStorage.setItem("reqsSoFar", "[0, 0, 0, 0, 0]");
  }

  const handleAddClass = (newClass: RawClass) => {
    setClassesTaken([...classesTaken, newClass]);
  };

  const handleDeleteClass = (index: number) => {
    const updatedClassesTaken = [...classesTaken];
    updatedClassesTaken.splice(index, 1);
    setClassesTaken(updatedClassesTaken);
  };

  const handleUpdateReqsNeeded = (newReqsNeeded: RawClass[]) => {
    setReqsNeeded([...reqsNeeded, ...newReqsNeeded]);
  };

  const handleRemoveReqNeeded = (hassType: string) => {
    const newNewReqsNeeded: RawClass[] = [...reqsNeeded];
    for (var i = 0; i < newNewReqsNeeded.length; i++) {
      if (newNewReqsNeeded[i][hassType] == true) {
        newNewReqsNeeded.splice(i, 1);
        break;
      }
    }
    setReqsNeeded(newNewReqsNeeded);
  };

  const handleAddReqNeeded = (hassType: string) => {
    const newNewReqsNeeded: RawClass[] = [...reqsNeeded];
    Axios.get("http://localhost:3000/getClass", {
      params: {
        hassType: hassType,
      },
    }).then((response) => {
      if (
        response.data &&
        !newNewReqsNeeded.some((item: RawClass) => item.no === response.data.no)
      ) {
        newNewReqsNeeded.push(response.data);
        setReqsNeeded(newNewReqsNeeded);
      }
    });
  };

  return (
    <ChakraProvider>
      <Banner />
      <div className="pageBody">
        <AddClass
          onAddClass={handleAddClass}
          onRemoveReqNeeded={handleRemoveReqNeeded}
        />
        <Grid templateColumns="repeat(2, 1fr)" gap={3}>
          <GridItem>
            <ClassesTaken
              onDeleteClass={handleDeleteClass}
              onAddReqNeeded={handleAddReqNeeded}
            />
          </GridItem>
          <GridItem>
            <SuggestedClasses
              classesTaken={classesTaken}
              reqsNeeded={reqsNeeded}
              onUpdateReqsNeeded={handleUpdateReqsNeeded}
            />
          </GridItem>
        </Grid>
      </div>
    </ChakraProvider>
  );
}

export default App;
