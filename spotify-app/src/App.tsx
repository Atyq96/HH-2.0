// src/App.tsx

import React from "react";
import MainPage from "./components/mainpage";
import Nav from "./components/navbar";
import Footer from "./components/footer";

const App: React.FC = () => {
  return (
    <div className="App">
      <Nav />
      <MainPage />
      <Footer />
    </div>
  );
};

export default App;
