import {
  createBrowserRouter,
} from "react-router-dom";

import { Root } from './Root';
// import { About } from './About';
// import { Portfolio } from './Portfolio';
import { Home } from './Home';

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
