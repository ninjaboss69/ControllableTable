import "./App.css";
import ControllableTable from "./components/Table/ControllableTable";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { array } from "./data";
import TreeDiagram from "./components/Tree/TreeDiagram";
import Main from "./components/Map/Main";
import GraphDiagram from "./components/Graph/Graph";
// import { Users } from "./data";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={<ControllableTable pageRow={10} array={array} />}
        />
        <Route path="/tree" element={<TreeDiagram />} />
        <Route path="/map" element={<Main />} />
        <Route path="graph" element={<GraphDiagram />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
