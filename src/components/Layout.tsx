import { Routes, Route, Navigate } from "react-router-dom";
import Favorites from "../routes/Favorites";
import Home from "../routes/Home";
import Edit from "../routes/Edit";
import Detail from "../routes/Detail";

const Layout = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/detail/:id" element={<Detail />} />
    <Route path="/edit/:id" element={<Edit />} />
    <Route path="/favorites" element={<Favorites />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default Layout;
