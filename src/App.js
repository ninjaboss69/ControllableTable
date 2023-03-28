import "./App.css";
import ControllableTable from "./components/Table/ControllableTable";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { array } from "./data";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;