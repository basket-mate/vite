import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, SignUp, Home, Recipe } from "./pages/index";
import Layout from './pages/layout/Layout';
import PrivateRoute from './components/common/PrivateRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />

          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/recipe/:videoId" element={<Recipe />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
