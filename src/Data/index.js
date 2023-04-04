// import { lazy, Suspense } from "react";

// const Dashboard = lazy(() => import("./components/Dashboard"));
// const ReactPage = lazy(() => import("./components/Tutorials/React"));
// const Javascript = lazy(() => import("./components/Tutorials/Javascript"));
// const Java = lazy(() => import("./components/Tutorials/Java"));
// const TutorialsIndex = lazy(() =>
//   import("./components/Tutorials/TutorialsIndex")
// );

// const Dashboard = lazy(() => import("../components/Dashboard"));
// const ReactPage = lazy(() => import("../components/Tutorials/React"));
// const Javascript = lazy(() => import("../components/Tutorials/Javascript"));
// const Java = lazy(() => import("../components/Tutorials/Java"));
// const TutorialsIndex = lazy(() =>
//   import("../components/Tutorials/TutorialsIndex")
// );

import { assets } from "../components/assets";

export const menuArray = [
  {
    name: "Dashboard",
    children: [],
    path: "dashboard",
    svg: assets.dashboard,
  },
  {
    name: "Analytics",
    children: [],
    path: "analytics",
    svg: assets.flash,
  },

  {
    name: "Tutorials",
    path: "tutorials",
    svg: assets.tutorials,
    children: [
      { name: "React", path: "react", svg: assets.tutorials },
      { name: "Javascript", path: "javascript", svg: assets.tutorials },
      { name: "Java", path: "java", svg: assets.tutorials },
    ],
  },
];

// const list = [
//   {
//     id: 1,
//     card: [
//       {
//         cId: 1,
//         name: "c1",
//         list: [
//           {
//             pId: 1,
//             isAvailable: true,
//           },
//           {
//             pId: 2,
//             isAvailable: true,
//           },
//           {
//             pId: 5,
//             isAvailable: true,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 2,
//     card: [
//       {
//         cId: 1,
//         name: "c1",
//         list: [
//           {
//             pId: 1,
//             isAvailable: true,
//           },
//           {
//             pId: 2,
//             isAvailable: true,
//           },
//           {
//             pId: 5,
//             isAvailable: true,
//           },
//         ],
//       },
//       {
//         cId: 2,
//         name: "c2",
//         list: [
//           {
//             pId: 1,
//             isAvailable: true,
//           },
//           {
//             pId: 2,
//             isAvailable: true,
//           },
//           {
//             pId: 5,
//             isAvailable: true,
//           },
//         ],
//       },
//     ],
//   },
// ];

// const dataStructure = {};

// // Creating A New Data Structure for Original Object

// for (let i = 0; i < list.length; i++) {
//   let name = list[i].id + "";

//   for (let j = 0; j < list[i].card.length; j++) {
//     const tt = name + list[i].card[j].name;

//     for (let k = 0; k < list[i].card[j].list.length; k++) {
//       const kk = tt + list[i].card[j].list[k].pId;
//       dataStructure[kk] = list[i].card[j].list[k];
//     }
//   }
// }

// console.log(dataStructure);

// dataStructure["1c12"].isAvailable = "hello";
// console.log(dataStructure["1c12"]);

// console.log(list);
