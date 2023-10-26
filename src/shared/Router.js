import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "../pages/Main";
import Register from "../pages/Register";
import Navigation from "../components/Navigation";
import Login from "../pages/Login";
import ProfilePage from "../pages/ProfilePage";
import ProfileUpload from "../pages/ProfileUpload";
import ProfileEdit from "../pages/ProfileEdit";

import NotFound from "../components/NotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navigation />}>
          <Route index element={<Main />} />
          <Route path="/profile-upload" element={<ProfileUpload />} />
          <Route path="/profile-edit" element={<ProfileEdit />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
