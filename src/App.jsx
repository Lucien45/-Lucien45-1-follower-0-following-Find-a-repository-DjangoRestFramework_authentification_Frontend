import { ToastContainer } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoute from "./routes/AuthRoute";

function App() {
  return (
    <BrowserRouter>
        <ToastContainer position='top-center'/>
        <Routes>    
            <Route path="/*" element={<AuthRoute/>}/>
        </Routes>  
    </BrowserRouter>
  );
}

export default App;
