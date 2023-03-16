import './App.css';
import Todos from './components/Todos';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Todo</h1>
        <h4>Your Todos here</h4>
        <Routes>
          <Route path="/" element={<Todos />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
