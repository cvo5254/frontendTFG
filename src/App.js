import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Login/>} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
