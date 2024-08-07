import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { CreateMercenary } from "./pages/CreateMercenary";
import { Mercenary, loader as mercenaryLoader } from "./pages/Mercenary";
import { MercenaryDetail, loader as mercenaryDetailLoader } from "./pages/MercenaryDetail";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import RootLayout from "./pages/Root";
import Error from "./pages/Error";
import { EditMercenary, loader as editLoader } from "./pages/EditMercenary";
import { action as MercenaryRecruitmentAction } from "./components/MercenaryRecruitmentForm";
import MercenaryList, { loader as listLoader } from "./pages/MercenaryList";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/http";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "recruitment",
        element: <CreateMercenary />,
        action: MercenaryRecruitmentAction,
      },

      {
        path: "recruitments",
        element: <Mercenary />,
        loader: mercenaryLoader,
      },
      {
        path: "recruitments/:teamId",
        element: <MercenaryDetail />,
        loader: mercenaryDetailLoader,
      },
      {
        path: "recruitments/:teamId/edit",
        element: <EditMercenary />,
        action: MercenaryRecruitmentAction,
        loader: editLoader,
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "mercenarylist", element: <MercenaryList />, loader: listLoader },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
