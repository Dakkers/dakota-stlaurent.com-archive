import {
  createBrowserRouter,
} from "react-router-dom";

import { Root } from './Root';
// import { About } from './About';
// import { Portfolio } from './Portfolio';
import { Home } from './Home';
import { Tools } from './Tools';
import { Keys } from './Tools/Keys';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: 'Oops!',
    children: [
      // {
      //   element: <About />,
      //   path: "about",
      // },
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/tools",
        element: <Tools />,
        children: [
        ]
      },
      {
        element: <Keys />,
        path: '/tools/keys'
      },
      // {
      //   path: "portfolio",
      //   element: <Portfolio />,
      // },
    ]
  },
  {

  }
]);

export { router }
