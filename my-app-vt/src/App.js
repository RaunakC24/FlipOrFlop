import React from 'react';
import GlobeComponent from './components/Globe';  // Assuming GlobeComponent is in a 'components' folder
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <img src="/logo.png" alt="Logo" className="App-logo" />


        {/* Update your h1 here with the new spans */}
        <h1 className="bold-orange-text">
        <span className="flip-text">flip</span> or <span className="flop-text">flop</span>
        </h1>

      </header>

      {/* Globe component */}
      {/* <section className="Globe-section">
        <GlobeComponent />
      </section> */}

      {/* Scrollable content */}
      <section className="content-section" style={{ height: '200vh', backgroundColor: '#ffffff' }}>
        <h2>Scroll Down</h2>
        <p>Scroll down to see the globe grow in size!</p>
      </section>

      <footer className="App-footer">
        <p>© 2024 Flip or Airbnb. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
