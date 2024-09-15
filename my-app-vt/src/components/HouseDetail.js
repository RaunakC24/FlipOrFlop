import {
  LineChart,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './HouseDetail.css'; // Import your CSS file

const HouseDetail = () => {
  const { address } = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const rating = parseFloat(searchParams.get('rating'));

  // Image paths for the ratings (1 to 5)
  useEffect(() => {
    const fetchHouseDetails = async () => {
      try {
        const response = await fetch('http://25.54.196.118:8080/getHomeEvaluation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: address,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch house details');
        }

        const data = await response.json();
        setHouse(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHouseDetails();
  }, [address]);

  if (loading) {
    return <h5>Loading house details...</h5>;
  }

  if (error) {
    return <h5 style={{ color: 'red' }}>Error: {error}</h5>;
  }

  if (!house) {
    return <h5>No house data found</h5>;
  }

  // Function to render rating images based on the house rating
  const renderRatingImages = (rating) => {
    if (rating === 1) {
        return <img src='/rating1.png' alt="1 Star" className="rating-image" />;
      } else if (rating === 2) {
        return (
          <>
            <img src='/rating2.png' alt="2 Star" className="rating-image" />
          </>
        );
      } else if (rating === 3) {
        return (
          <>
            <img src='/rating3.png' alt="3 Star" className="rating-image" />
          </>
        );
      } else if (rating === 4) {
        return (
          <>
            <img src='/rating4.png' alt="4 Star" className="rating-image" />
          </>
        );
      } else if (rating === 5) {
        return (
          <>
            <img src='/rating5.png' alt="5 Star" className="rating-image" />
          </>
        );
      } else {
        return null;
      }
  };

  // Use regex to remove everything that isn't a digit (numbers) for price and square feet
  const price = house.price ? house.price.replace(/[^\d]/g, '') : null;
  const squareFeet = house.squareFeet ? house.squareFeet.replace(/[^\d]/g, '') : null;

  // Convert cleaned string values to numbers
  const priceValue = parseFloat(price);
  const squareFeetValue = parseFloat(squareFeet);

  // Calculate price per square foot
  const pricePerSquareFoot = (priceValue && squareFeetValue)
    ? (priceValue / squareFeetValue).toFixed(2)
    : 'N/A';

  return (
    <div className="house-detail-container">
      <h2 className="house-detail-title">Details for {house.address}</h2>

      {/* Flexbox container for image and details */}
      <div className="house-detail-flexbox">
        {/* House image */}
        {house.imageUrl && (
          <div className="house-image-section">
            <img src={house.imageUrl} alt="House" className="house-image" />
          </div>
        )}

        {/* House details */}
        <div className="house-detail-info">
          {/* Left column for price, year-built, and description */}
          <div className="house-info-column">
            <p><strong>Price:</strong> {house.price || 'N/A'}</p>
            <p><strong>Year Built:</strong> {house.yearBuilt || 'N/A'}</p>
            <p><strong>Description:</strong> {house.description || 'No description available'}</p>
          </div>

          {/* Right column for the rating */}
          <div className="rating-column">
            <h3>Rating</h3>
            <div className="rating-container">
              {renderRatingImages(rating)}
            </div>
          </div>
        </div>
      </div>

      {/* New section with beds, baths, square feet, and price per square foot */}
      <div className="house-info-section">
        <div className="house-info-item">
          <strong>{house.beds || 'N/A'}</strong> Beds
        </div>
        <div className="divider"></div>
        <div className="house-info-item">
          <strong>{house.baths || 'N/A'}</strong> Baths
        </div>
        <div className="divider"></div>
        <div className="house-info-item">
          <strong>{house.squareFeet || 'N/A'}</strong> Sq Ft
        </div>
        <div className="divider"></div>
        <div className="house-info-item">
          <strong>${pricePerSquareFoot}</strong> Price per Sq Ft
        </div>
      </div>

      {/* Add additional image underneath */}
      {house.additionalImageUrl && (
        <div className="house-additional-image-section">
          <h3>Additional Image</h3>
          <img src={house.additionalImageUrl} alt="Additional view of the house" className="house-additional-image" />
        </div>
      )}

      <div className="house-price-section">
        <h3>Prices Over the Years</h3>
        {house.priceHistory && house.priceHistory.length > 0 ? (
          <ul>
            {house.priceHistory.map((price, index) => (
              <li key={index}>
                Year: {price.year}, Price: ${price.amount}
              </li>
            ))}
          </ul>
        ) : (
          <p>No price history available</p>
        )}
      </div>

      <div className="house-section">
        <h3>Tax Data</h3>
        <LineChart data={house.taxData} margin={{right: 150}} width={1200} height={500}>
            <XAxis dataKey="year" interval="preserveStartEnd" strokeWidth={3} tick={{ fontSize: 20 }}/>
            <YAxis width={100} strokeWidth={3} tick={{ fontSize: 20 }}/>
            <Legend formatter={(value) => {
                // Mapping the dataKey to a custom display name
                const nameMap = {
                  taxPaid: "Tax Paid",
                  taxAssessment: "Tax Assessment",
                  land: "Land Value",
                  improvement: "Improvement Value"
                };
                return <span style={{ cursor: "pointer" }}>{nameMap[value] || value}</span>;
            }}/>
            <Tooltip 
              contentStyle={{ backgroundColor: "#ddd", color: "#000" }}
              formatter={(value, name) => {
                const nameMap = {
                  taxPaid: "Tax Paid",
                  taxAssessment: "Tax Assessment",
                  land: "Land Value",
                  improvement: "Improvement Value"
                };
                return [value, nameMap[name] || name];
              }}
              labelFormatter={(label) => `${label}`}
            />
            <Line dataKey="taxPaid" stroke="#FF8C00" activeDot={{r: 8}} strokeWidth={3}/>
            <Line dataKey="taxAssessment" stroke="#0000FF" activeDot={{r: 8}} strokeWidth={3}/>
            <Line dataKey="land" stroke="#000000" activeDot={{r: 8}} strokeWidth={3}/>
            <Line dataKey="improvement" stroke="#FF0000" activeDot={{r: 8}} strokeWidth={3}/>
            <CartesianGrid strokeDasharray="3 3" />
        </LineChart>
      </div>

      <div className="house-section">
        <h3>Highlights</h3>
        <ul>
          {house.highlights?.length > 0 ? (
            house.highlights.map((highlight, index) => <li key={index}>{highlight}</li>)
          ) : (
            <p>No highlights available</p>
          )}
        </ul>
      </div>

      <div className="house-section">
        <h3>Investment Insights</h3>
        <p><strong>Should Buy:</strong> {house.shouldBuy ? 'Yes' : 'No'}</p>
        <p><strong>Estimated Money Made:</strong> {house.estimatedMoneyBack?.estimatedMoneyMade || 'N/A'}</p>
      </div>
    </div>
  );
};

export default HouseDetail;
