import EmployeeList from "./components/EmployeeList";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/employees" element={<EmployeeList />}></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
