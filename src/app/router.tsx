import { Home } from "@/pages/home";
import { Daily } from "@/pages/daily";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/daily",
    element: <Daily />,
  },
]);
