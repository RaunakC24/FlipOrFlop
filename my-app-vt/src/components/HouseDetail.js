import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Rating from '@mui/material/Rating';  // Import the Rating component

const HouseDetail = () => {
  const { address } = useParams(); // Get the house address from the URL
  const [house, setHouse] = useState(null); // State to hold house details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Use useLocation to get the query parameters
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const rating = parseFloat(searchParams.get('rating')); // Get the rating from query params

  useEffect(() => {
    console.log('Fetching house details for address:', address);

    // Function to fetch house details by address
    const fetchHouseDetails = async () => {
      try {
        const response = await fetch('http://25.54.196.118:8080/getHomeEvaluation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // Send the address as raw JSON, just like in Postman
          body: address,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch house details');
        }

        const data = await response.json();
        setHouse(data); // Set the house data in state
        setLoading(false); // Disable loading
      } catch (err) {
        console.error('Error fetching house details:', err);
        setError(err.message); // Set error message
        setLoading(false); // Disable loading
      }
    };

    fetchHouseDetails();
  }, [address]); // Fetch house details when the address changes

  if (loading) {
    return <h5>Loading house details...</h5>;
  }

  if (error) {
    return <h5 style={{ color: 'red' }}>Error: {error}</h5>;
  }

  if (!house) {
    return <h5>No house data found</h5>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Details for {house.address}</h2>

      {/* Display house details */}
      <p><strong>Price:</strong> {house.price || 'N/A'}</p>
      <p><strong>Year Built:</strong> {house.yearBuilt || 'N/A'}</p>
      <p><strong>Description:</strong> {house.description || 'No description available'}</p>
      <p><strong>Square Feet:</strong> {house.squareFeet || 'N/A'}</p>

      <div style={{ marginTop: '20px' }}>
        <h3>Rating</h3>
        {/* Display Rating passed from the HouseList */}
        <Rating name="read-only" value={rating} readOnly precision={0.5} />
      </div>

      {house.imageUrl && (
        <div style={{ marginTop: '20px' }}>
          <h3>House Image</h3>
          <img src={house.imageUrl} alt="House" style={{ width: '100%', maxWidth: '600px' }} />
        </div>
      )}
    </div>
  );
};

export default HouseDetail;
