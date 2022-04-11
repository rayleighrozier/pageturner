import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Book from "./components/Book";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/book/:id" element={<Book />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
