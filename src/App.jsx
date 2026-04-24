import { useEffect, useState } from "react";
import Login from "./pages/Login";
import { MyOrganizer } from "./pages/myOrganizer";
import { AddOrganizer } from "./pages/AddOrganizer";
import { ErrorPage } from "./pages/errorPage";
import { Items } from "./pages/Items";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import api from "./utils/axios";
import "./App.css";
import { getAuthToken } from "./utils/authStorage";

function ProtectedRoute({ children }) {
  return getAuthToken() ? children : <Navigate to="/" replace />;
}

function PublicRoute({ children }) {
  return getAuthToken() ? <Navigate to="/organizer" replace /> : children;
}

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
        <Route index element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/organizer" element={<ProtectedRoute><MyOrganizer organizerItems={organizerItems} setOrganizerItems={setOrganizerItems} isLoading={isLoading} /></ProtectedRoute>} />
        <Route path="/organizer/add" element={<ProtectedRoute><AddOrganizer /></ProtectedRoute>} />
        <Route
          path="/items/:storageId"
          element={
            <ProtectedRoute><Items organizerItems={organizerItems} setOrganizerItems={setOrganizerItems} /></ProtectedRoute>
          } />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

    </>
  );
}

export default App;
