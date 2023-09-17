import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "component/navbar";
import Home from "pages/home";
import About from "pages/about";
import Users from "pages/users";
import UserProfile from "pages/users/user-profile";

function App() {
  return (
    <BrowserRouter>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UserProfile />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
