import { useEffect, useState } from "react";
import Login from "./pages/Login";
import { MyOrganizer } from "./pages/myOrganizer";
import { AddOrganizer } from "./pages/AddOrganizer";
import { ErrorPage } from "./pages/errorPage";
import { Items } from "./pages/Items";
import { Route, Routes, useLocation } from "react-router-dom";
import api from "./utils/axios";
import "./App.css";
import { getAuthToken } from "./utils/authStorage";


function App() {
  const [organizerItems, setOrganizerItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchOrganizerItems = async () => {
      const token = getAuthToken();
      setIsLoading(true);
      if (!token) {
        setOrganizerItems([]);
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get('/organize-items');
        const data = response.data;
        setOrganizerItems(data);
        setIsLoading(false);

      } catch (error) {
        console.error("Failed to fetch organizer items:", error);
        setOrganizerItems([]);
        setIsLoading(false);
      }
    };

    fetchOrganizerItems();

  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/organizer" element={<MyOrganizer organizerItems={organizerItems} isLoading={isLoading} />} />
        <Route path="/organizer/add" element={<AddOrganizer />} />
        <Route
          path="/items/:storageId"
          element={
            <Items organizerItems={organizerItems} setOrganizerItems={setOrganizerItems} />
          } />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

    </>
  );
}

export default App;
