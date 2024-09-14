import React, { useState } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { IoIosSearch } from "react-icons/io";
import HouseList from './components/HouseList';
import HouseDetail from './components/HouseDetail';

function App() {
  const navigate = useNavigate();  // useNavigate inside a Router context
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm) {
      navigate(`/${encodeURIComponent(searchTerm)}`);  // Use navigate for routing
    }
  };

  return (
    <div className="App">
      {/* Add the header bar here */}
      <div className="header-bar">
      </div>
      {/* Main Content Section */}
      <Routes>
        <Route path="/:cityOrZip" element={<HouseList />} />
        <Route path="/:id" element={<HouseDetail />} />

        {/* Default Home Page */}
        <Route path="/" element={
          <>
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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

            <section className="intro-section">
              <h2>Rating Scale</h2>
              <img src="/rating.png" style={{ width: '600px', height: 'auto' }} />
              <p class="rating-description">Each house is rated on a scale 1(worst) - 5(best)</p>
              <p class="rating-description">Our ratings are based on the parameters below:</p>
              <hr className="orange-line" />
            </section>

            <section className="factors-section">

              {/* first factor section - the rate of change of prices in the area */}
              <div className="factor">
                <div className="rate-of-change-container">
                  <h2 className="rate-of-change-title">
                    The rate of change in property prices
                  </h2>
                  <p className="rate-of-change-text">
                    The rate at which property prices are increasing (or decreasing) in the area is a strong indicator of potential return on investment. We analyze local market trends over the past few years. Areas with high demand, improved infrastructure, or urban development tend to see faster appreciation.
                  </p>
                  <img src="/rateofchange.png" alt="Rate of Change" className="rate-of-change-image" />
                </div>
              </div>

              {/* second factor section - the neighborhood quality */}
              <div className="factor">
                <div className="neighborhood-container">
                  <h2 className="neighborhood-title">
                    The quality of a neighborhood
                  </h2>
                  <p className="neighborhood-text">
                    Desirable neighborhoods with amenities, parks, low crime rates, and good accessibility can command higher prices and attract both buyers and renters.
                  </p>
                  <img src="/neighborhood.png" alt="Neighborhood" className="neighborhood-image" />
                </div>
              </div>

              {/* third factor section - school systems */}
              <div className="factor">
                <div className="school-container">
                  <h2 className="school-title">
                    The quality of the school systems
                  </h2>
                  <p className="school-text">
                    The quality of local school systems is a major consideration for families when buying a home. In many caes, homes in areas with highly rated schools command higher prices and have faster sales.
                  </p>
                  <img src="/schoolsystem.png" alt="School Systems" className="school-image" />
                </div>
              </div>

              {/* fourth factor section - year of build */}
              <div className="factor">
                <h2>Year the house was built</h2>
              </div>

              {/* fifth factor section - turnover rate */}
              <div className="factor">
                <h2>Turnover rate of homes</h2>
              </div>
            </section>



            {/* Embedded Websites Section */}
            <section className="resources-section">
              <h2>Tips & Tricks for Flipping</h2>
              <div className="resources-container">
                <hr className="orange-line" />


                <div className="resource-item">
                  <a href="https://www.hgtv.com/lifestyle/real-estate/house-flipping-dos-donts-from-egypt-sherrod" target="_blank" rel="noopener noreferrer">
                    <img src="/flipping.png" alt="HGTV Preview" className="resource-image" />
                  </a>
                  <a href="https://www.hgtv.com/lifestyle/real-estate/house-flipping-dos-donts-from-egypt-sherrod" target="_blank" rel="noopener noreferrer">
                    Visit HGTV: House Flipping Do's & Don'ts
                  </a>
                </div>

                <div className="resource-item">
                  <a href="https://www.ramseysolutions.com/real-estate/how-to-flip-a-house" target="_blank" rel="noopener noreferrer">
                    <img src="/flipping2.png" alt="Website Preview 2" className="resource-image" />
                  </a>
                  <a href="https://www.ramseysolutions.com/real-estate/how-to-flip-a-house" target="_blank" rel="noopener noreferrer">
                    Visit Ramsey: How to Flip a House
                  </a>
                </div>

                <div className="resource-item">
                  <a href="https://www.thisoldhouse.com/home-finances/21163281/tips-for-house-flipping" target="_blank" rel="noopener noreferrer">
                    <img src="/flipping3.png" alt="Website Preview 3" className="resource-image" />
                  </a>
                  <a href="https://www.thisoldhouse.com/home-finances/21163281/tips-for-house-flipping" target="_blank" rel="noopener noreferrer">
                    visit ThisOldHouse: Tips for House Flipping
                  </a>
                </div>

              </div>
            </section>


          </>
        } />

      </Routes>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default App;
