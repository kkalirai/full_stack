import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Survey from "./Survey";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <>
            <Route path="/" exact element={<Home />} />
            <Route path="/user/login" exact element={<Login />} />
            <Route path="/user/register" exact element={<Register />} />
            <Route path="/user/dashboard" exact element={<Dashboard />} />
            <Route path="/user/create-survey" exact element={<Survey />} />
            <Route path="*" element={"Hello"} />
          </>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
