import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./UserContext";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Users from "./components/Users/Users";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
