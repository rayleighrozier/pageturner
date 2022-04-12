import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Book from "./components/Book/Book";
import Search from "./components/Search";

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
            <Route path="/search/:q" element={<Search />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
