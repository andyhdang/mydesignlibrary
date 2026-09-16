import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import DotGrid from "./components/dot-grid/DotGrid";
import Navigation from "./components/navigation/Navigation";
import CaseStudy from "./pages/case-study/CaseStudy";
import Home from "./pages/home/Home";
import StyleGuide from "./pages/style-guide/StyleGuide";

function App() {
  return (
    <Router>
      <DotGrid />
      <div className='App'>
        <Navigation />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/case-study-template' element={<CaseStudy />} />
            <Route path='/style-guide' element={<StyleGuide />} />
            <Route path='/style-guide/:section' element={<StyleGuide />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
