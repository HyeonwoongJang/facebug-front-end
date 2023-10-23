import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Register from "../pages/Register";
import Navigation from "../components/Navigation";
import NotFound from "../components/NotFound";
import Login from "../pages/Login";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navigation />}>
          <Route index element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
