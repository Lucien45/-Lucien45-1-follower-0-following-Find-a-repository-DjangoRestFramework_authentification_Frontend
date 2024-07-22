import { useState, useEffect } from "react";
import { ToastContainer } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoute from "./routes/AuthRoute";
import AdminRoute from "./routes/AdminRute";
import { ThemeProvider } from "./components/other/ThemeContext";
import LoadingSpinner from "./components/other/LoadingSpinner";
import './App.css'
function App() {
  const [loading, setLoading] = useState(false);
  return (
    <ThemeProvider>
      <BrowserRouter>
        {loading && <LoadingSpinner />}
        <ToastContainer position='top-center'/>
        <Routes>    
          <Route path="/*" element={<AuthRoute/>}/>
          <Route path="/admin/*" element={<AdminRoute setLoading={setLoading}/>}/>
        </Routes>  
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
