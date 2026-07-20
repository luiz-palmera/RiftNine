import { Home } from "@/pages/home";
import { Daily } from "@/pages/daily";
import { createBrowserRouter } from "react-router";
import { ComponentsShowcase } from "@/pages/components-showcase";
import { Versus } from "@/pages/versus";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/daily",
    element: <Daily />,
  },
  {
    path: "/versus",
    element: <Versus />,
  },
  {
    path: "/components",
    element: <ComponentsShowcase />,
  },
]);
