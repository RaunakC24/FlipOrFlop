import React from 'react';
import GlobeComponent from './components/Globe';  // Assuming GlobeComponent is in a 'components' folder
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Update your h1 here with the new spans */}
        <h1 className="bold-orange-text">
  <span className="flip-text">flip</span> or <span className="flop-text">flop</span>
</h1>

        <p className="bold-orange-text">Find out if your property is worth flipping or turning into an Airbnb.</p>
      </header>

      {/* Globe component */}
      <section className="Globe-section">
        <GlobeComponent />
      </section>

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
