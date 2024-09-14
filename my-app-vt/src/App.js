import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/logo.png" alt="Logo" className="App-logo" />
      </header>

      {/* Set background image inline */}
      <section
        className="background-image-section"
        style={{
          backgroundImage: 'url(/homestogetherimage.jpg)', // Correct reference to the image in public folder
          backgroundSize: 'cover', // Ensure the image covers the section
          backgroundPosition: 'bottom', // Align the image to cut the sky off
          height: '70vh', // Adjust the height to give the cutoff look
          width: '100vw',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Additional content can go here, like a search bar */}
        <div className="overlay-content">
          <h2 className="overlay-heading">Find a Home You Love</h2>
          <input
            type="text"
            placeholder="Enter an address, neighborhood, city, or ZIP code"
            className="search-bar"
          />
        </div>
      </section>

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
