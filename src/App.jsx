import { useEffect, useState } from "react";
import Login from "./pages/Login";
import { MyOrganizer } from "./pages/myOrganizer";
import { AddOrganizer } from "./pages/AddOrganizer";
import { ErrorPage } from "./pages/errorPage";
import { Items } from "./pages/Items";
import { Route, Routes, useLocation } from "react-router-dom";
import api from "./utils/axios";
import "./App.css";


function App() {
  const [organizerItems, setOrganizerItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchOrganizerItems = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setOrganizerItems([]);
        return;
      }

      try {
        const response = await api.get('/organize-items');
        const data = response.data;
        setOrganizerItems(data);

      } catch (error) {
        console.error("Failed to fetch organizer items:", error);
        setOrganizerItems([]);
      }
    };

    fetchOrganizerItems();

  }, [location.pathname]);
  console.log(organizerItems);
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/organizer" element={<MyOrganizer organizerItems={organizerItems} />} />
        <Route path="/organizer/add" element={<AddOrganizer />} />
        <Route
          path="/items/:storageId"
          element={
            <Items organizerItems={organizerItems} />
          } />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

    </>
  );
}

export default App;
