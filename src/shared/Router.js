import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Register from "../pages/Register";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<Main />} /> */}
        <Route index element={<Register />} />
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
