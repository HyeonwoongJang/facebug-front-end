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
        <Route basename={process.env.PUBLIC_URL} element={<Navigation />}>
          <Route basename={process.env.PUBLIC_URL} index element={<Main />} />
          <Route
            basename={process.env.PUBLIC_URL}
            path="/profile-upload"
            element={<ProfileUpload />}
          />
          <Route
            basename={process.env.PUBLIC_URL}
            path="/profile-edit"
            element={<ProfileEdit />}
          />
          <Route
            basename={process.env.PUBLIC_URL}
            path="/profile/:id"
            element={<ProfilePage />}
          />
          <Route
            basename={process.env.PUBLIC_URL}
            path="/register"
            element={<Register />}
          />
          <Route
            basename={process.env.PUBLIC_URL}
            path="/login"
            element={<Login />}
          />
        </Route>
        <Route
          basename={process.env.PUBLIC_URL}
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
