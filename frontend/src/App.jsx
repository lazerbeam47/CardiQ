import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Content } from "./components/Content";
import { Flashcard } from "./components/Flashcards";
import { Header } from "./components/Header";
import { Home } from "./Home";

function App() {
  return (
    <div className=" m-0 h-full w-full bg-white">
      {/* Background Grid Effect */}
      {/* <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_40px] [mask-image:radial-gradient(ellipse_90%_90%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"></div> */}

      {/* Main Content */}
      <BrowserRouter>
        <Routes>
          {/* Default Route for Home */}
          <Route path="/" element={<Home />} />
          <Route path="/flashcards" element={<Flashcard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;

