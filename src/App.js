import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./UserContext";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Users from "./components/Users/Users";
import Publish from "./components/Emergencies/Publish";
import UsersAdmin from "./components/Users/UsersAdmin";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/users" element={<Users />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/usersAdmin" element={<UsersAdmin />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
