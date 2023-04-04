import "./App.css";
import Menu from "./components/ Menu";
import { menuArray } from "./Data";
import { Routes, Route } from "react-router-dom";
import NoRouteMatch from "./components/NoRouteMatch";
import { lazy, Suspense } from "react";
const Dashboard = lazy(() => import("./components/Dashboard"));
const ReactPage = lazy(() => import("./components/Tutorials/React"));
const Javascript = lazy(() => import("./components/Tutorials/Javascript"));
const Java = lazy(() => import("./components/Tutorials/Java"));
const TutorialsIndex = lazy(() =>
  import("./components/Tutorials/TutorialsIndex")
);
function App() {
  return (
    <Routes>
      <Route path="/" element={<Menu menuArray={menuArray} />}>
        <Route
          index
          element={
            <Suspense fallback={<div>Please Wait Before Loading Complete</div>}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<div>Please Wait Before Loading Complete</div>}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="tutorials"
          element={
            <Suspense fallback={<div>Please Wait Before Loading Complete</div>}>
              <TutorialsIndex />
            </Suspense>
          }
        />
        <Route
          path="tutorials/react"
          element={
            <Suspense fallback={<div>Please Wait Before Loading Complete</div>}>
              <ReactPage />
            </Suspense>
          }
        />
        <Route
          path="tutorials/react"
          element={
            <Suspense fallback={<div>Please Wait Before Loading Complete</div>}>
              <ReactPage />
            </Suspense>
          }
        />
        <Route
          path="tutorials/javascript"
          element={
            <Suspense fallback={<div>Please Wait Before Loading Complete</div>}>
              <Javascript />
            </Suspense>
          }
        />
        <Route
          path="tutorials/java"
          element={
            <Suspense fallback={<div>Please Wait Before Loading Complete</div>}>
              <Java />
            </Suspense>
          }
        />
        <Route path="*" element={<NoRouteMatch />} />
      </Route>
    </Routes>
  );
}

export default App;
