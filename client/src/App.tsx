import { ChakraProvider } from "@chakra-ui/react";
import Banner from "./components/Banner";
import AddClass from "./components/AddClass";
import ClassesTaken from "./components/ClassesTaken";

function App() {
  return (
    <ChakraProvider>
      <Banner />
      <AddClass />
      <ClassesTaken />
    </ChakraProvider>
  );
}

export default App;
