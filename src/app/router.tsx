import { createBrowserRouter } from "react-router";
import { Home } from "../pages/home";
import { SoloGame } from "../pages/solo-game";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/daily",
    element: <SoloGame />,
  },
]);
