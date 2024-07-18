import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { Team } from "./pages/Team";
import { Mercenary, Loader as mercenaryLoader } from "./pages/Mercenary";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { MyTeam, loader as myTeamLoader } from "./pages/MyTeam";
import { Recruitment } from "./pages/Recruitment";
import RootLayout from "./pages/Root";
import Error from "./pages/Error";
import MercenaryDetail, {
  loader as mercenaryDetailLoader,
} from "./pages/MercenaryDetail";
import { EditMyTeam } from "./pages/EditMyTeam";
import { action as teamAction } from "./components/UI/TeamForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "myteam",
    loader: myTeamLoader,
    errorElement: <Error />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "team", element: <Team />, action: teamAction },
      {
        path: "myteam",
        children: [
          { index: true, element: <MyTeam /> },
          { path: "edit", element: <EditMyTeam />, action: teamAction },
        ],
      },
      { path: "recruitment", element: <Recruitment /> },
      { path: "mercenary", element: <Mercenary />, loader: mercenaryLoader },
      {
        path: "mercenary/:teamId",
        element: <MercenaryDetail />,
        loader: mercenaryDetailLoader,
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
