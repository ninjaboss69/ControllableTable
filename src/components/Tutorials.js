import React from "react";
import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import NoRouteMatch from "./NoRouteMatch";
import Dashboard from "./Dashboard";

const Tutorials = () => {
  const TutorialsIndex = lazy(() => import("./Tutorials/TutorialsIndex"));
  const Javascript = lazy(() => import("./Tutorials/Javascript"));
  const Java = lazy(() => import("./Tutorials/Java"));
  const ReactPage = lazy(() => import("./Tutorials/React"));
  return (
    <Routes>
      {console.log("rendering route define totorials page")}
      <Route
        index
        element={
          <Suspense fallback={<>...</>}>
            <Dashboard />
          </Suspense>
        }
      />
      <Route
        path="/react"
        element={
          <Suspense fallback={<>...</>}>
            <ReactPage />
          </Suspense>
        }
      />
      <Route
        path="/javascript"
        element={
          <Suspense fallback={<>...</>}>
            <Javascript />
          </Suspense>
        }
      />
      <Route
        path="/java"
        element={
          <Suspense fallback={<>...</>}>
            <Java />
          </Suspense>
        }
      />
      <Route
        path="/*"
        element={
          <Suspense fallback={<>...</>}>
            <NoRouteMatch />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default Tutorials;
