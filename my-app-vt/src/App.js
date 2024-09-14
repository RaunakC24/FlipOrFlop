import React from 'react';
import GlobeComponent from './components/Globe'; // Assuming GlobeComponent is in a 'components' folder
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Flip or Airbnb</h1>
        <p>Find out if your property is worth flipping or turning into an Airbnb.</p>
      </header>

      {/* Globe component */}
      <section className="Globe-section">
        <GlobeComponent />
      </section>

      {/* Add scrollable content to ensure the page scrolls */}
      <section className="content-section" style={{ height: '200vh', backgroundColor: '#f2f2f2' }}>
        <h2>Scroll Down</h2>
        <p>Scroll down to see the globe grow in size!</p>
      </section>

      <section className="content-section" style={{ height: '200vh', backgroundColor: '#ccc' }}>
        <h2>More Information</h2>
        <p>Additional details about flipping properties or turning them into Airbnbs.</p>
      </section>

      <footer className="App-footer">
        <p>© 2024 Flip or Airbnb. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
