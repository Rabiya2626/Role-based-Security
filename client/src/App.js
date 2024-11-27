import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Signup from "./component/Signup";
import Login from "./component/Login";

function App() {
  const host=process.env.REACT_APP_HOST_NAME;
  return (
    <>
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/login'  element={<Login host={host}/>}></Route>
            <Route exact path='/signup' element={<Signup  host={host}/>}></Route>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
