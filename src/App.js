import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "component/navbar";
import Home from "pages/home";
import About from "pages/about";
import Users from "pages/users";
import UserProfile from "pages/users/user-profile";
import Todo from "pages/todo";

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
          <Route path="todo" element={<Todo />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
