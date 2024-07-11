import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { Team } from "./pages/Team";
import { Mercenary } from "./pages/Mercenary";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Header from "./components/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/team" element={<Team />} />
          <Route path="/mercenary" element={<Mercenary />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
