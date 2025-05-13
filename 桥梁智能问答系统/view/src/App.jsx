import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignQA from './pages/SignQA';
import Gloss2Text from './pages/Gloss2Text';
import Text2Gloss from './pages/Text2Gloss';

function App() {
  const [isChinese, setIsChinese] = useState(true);

  const switchLanguage = () => {
    setIsChinese(!isChinese);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home isChinese={isChinese} switchLanguage={switchLanguage} />}
        />
        <Route path="/sign_qa" element={<SignQA />} />
        <Route path="/gloss2text" element={<Gloss2Text />} />
        <Route path="/text2gloss" element={<Text2Gloss />} />
      </Routes>
    </Router>
  );
}

export default App;
