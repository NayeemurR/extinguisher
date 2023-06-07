import { ChakraProvider } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import Banner from "./components/Banner";
import AddClass from "./components/AddClass";
import ClassesTaken from "./components/ClassesTaken";
import SuggestedClasses from "./components/SuggestedClasses";

function App() {
  return (
    <ChakraProvider>
      <Banner />
      <AddClass />
      <Grid templateColumns="repeat(2, 1fr)" gap={3}>
        <GridItem>
          <ClassesTaken />
        </GridItem>
        <GridItem>
          <SuggestedClasses />
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
