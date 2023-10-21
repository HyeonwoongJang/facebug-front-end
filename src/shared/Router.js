import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
