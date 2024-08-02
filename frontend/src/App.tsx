import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { Team } from "./pages/Team";
import { Mercenary, Loader as mercenaryLoader } from "./pages/Mercenary";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import RootLayout from "./pages/Root";
import Error from "./pages/Error";
import MercenaryDetail, {
  loader as mercenaryDetailLoader,
} from "./pages/MercenaryDetail";
import { EditMyTeam, loader as editLoader } from "./pages/EditMyTeam";
import { action as teamAction } from "./components/TeamForm";
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
      { path: "team", element: <Team />, action: teamAction },

      { path: "mercenary", element: <Mercenary />, loader: mercenaryLoader },
      {
        path: "mercenary/:teamId",
        element: <MercenaryDetail />,
        loader: mercenaryDetailLoader,
      },
      {
        path: "mercenary/:teamId/edit",
        element: <EditMyTeam />,
        action: teamAction,
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
