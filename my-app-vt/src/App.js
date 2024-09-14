import React from 'react';
import './App.css';
import Footer from './Footer'; // Import Footer from a separate component

function App() {
  return (
    <div className="App">



      {/* Set background image inline */}
      <section
        className="background-image-section"
        style={{
          backgroundImage: 'url(/homestogetherimage.jpg)', // Correct reference to the image in public folder
          backgroundSize: 'cover', // Ensure the image covers the section
          backgroundPosition: 'center 70%', // Align the image to cut the sky off
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

      {/* New Section with Steps and Images */}
      <section className="steps-section" style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
        <div className="steps-container" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <div className="step">
            <h3>Step 1</h3>
            <img src="/image1.png" alt="Step 1" style={{ width: '400px', height: '300px' }} />
            <p>Choose a neighborhood you are looking to buy in</p>
          </div>
          <div className="step">
            <h3>Step 2</h3>
            <img src="/image2.png" alt="Step 2" style={{ width: '400px', height: '300px' }} />
            <p>Select a house</p>
          </div>
          <div className="step">
            <h3>Step 3</h3>
            <img src="/step3image.jpg" alt="Step 3" style={{ width: '200px', height: '150px' }} />
            <p>Get your rating</p>
          </div>
        </div>
      </section>

      <section className="content-section" style={{ height: '200vh', backgroundColor: '#ffffff' }}>
        <h2>Scroll Down</h2>
        <p>Scroll down to see the globe grow in size!</p>
      </section>

      {/* Include the Footer component */}
      <Footer />
    </div>
  );
}

export default App;
