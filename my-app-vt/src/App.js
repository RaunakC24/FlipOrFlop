import React, { useState } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { IoIosSearch } from "react-icons/io";
import HouseList from './components/HouseList';  // Correcting the import
import HouseDetail from './components/HouseDetail';  // Correcting the import

function App() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm) {
      navigate(`/houses/${searchTerm}`);
    }
  };

  return (
    <div className="App">
      <section
        className="background-image-section"
        style={{
          backgroundImage: 'url(/homestogetherimage.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 70%',
          height: '70vh',
          width: '100vw',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="top-right-logo">FliporFlop.com</div>

        <div className="overlay-content">
          <h2 className="overlay-heading">Discover Your Next Great Investment</h2>

          {/* Search bar container */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Enter a City or ZIP code"
              className="search-bar"
              value={searchTerm} // Bind the input value to searchTerm
              onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <button className="search-icon" onClick={handleSearch}>
              <IoIosSearch />
            </button>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps-section">
        <div className="steps-container">
          <div className="step">
            <h3>Step 1</h3>
            <img src="/image1.png" alt="Step 1" style={{ width: '400px', height: '300px' }} />
            <p>Choose a neighborhood</p>
          </div>
          <div className="step">
            <h3>Step 2</h3>
            <img src="/image2.png" alt="Step 2" style={{ width: '400px', height: '300px' }} />
            <p>Select a house</p>
          </div>
          <div className="step">
            <h3>Step 3</h3>
            <img src="/image3.png" alt="Step 3" style={{ width: '400px', height: '300px' }} />
            <p>Get your rating</p>
          </div>
        </div>
      </section>

      {/* New Static Introduction Section */}
      <section className="intro-section">
        <h2>Some Factors We Consider Are:</h2>
      </section>

      {/* Parallax-Scrolling Factors Section */}
      <section className="factors-section">
        <div className="factor">
          <h2>The rate of change in property prices</h2>
        </div>
        <div className="factor">
          <h2>Neighborhood quality</h2>
        </div>
        <div className="factor">
          <h2>School systems</h2>
        </div>
        <div className="factor">
          <h2>Year the house was built</h2>
        </div>
        <div className="factor">
          <h2>Turnover rate of homes</h2>
        </div>
      </section>

      <Routes>
        {/* Route to display houses based on search */}
        <Route path="/houses/:cityOrZip" element={<HouseList />} />

        {/* Route to display details for a specific house */}
        <Route path="/house/:id" element={<HouseDetail />} />
      </Routes>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default App;
