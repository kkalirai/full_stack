import logo from './logo.svg';
import Survey from './Survey';
import Home from './Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Register';
import Login from './Login';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <>
          <Route path="/" exact element={<Home />} />
          <Route path="/user/login" exact element={<Login />} />
          <Route path="/user/register" exact element={<Register />} />
          <Route path="*" element={"Hello"} />
        </>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
