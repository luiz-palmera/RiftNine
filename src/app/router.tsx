import { Home } from "@/pages/home";
import { SoloGame } from "@/pages/solo-game";
import { createBrowserRouter } from "react-router";

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
