import React from 'react';
import './App.css';
import FormikOnboardForm from "./components/OnboardForm";

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Colorado Springs</h1>
        <h2>The Good Life</h2>
      </div>
      <FormikOnboardForm/>
    </div>
  );
}

export default App;
