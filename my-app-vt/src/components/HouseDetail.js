// src/components/HouseDetail.js
import React from 'react';

const HouseDetail = ({ match }) => {
  const houseId = match.params.id;

  // Example static data for a house detail (normally fetched by an API)
  const house = {
    id: houseId,
    address: '123 Main St',
    price: '$400,000',
    description: 'A beautiful 3-bedroom house in a quiet neighborhood.',
    features: ['3 bedrooms', '2 bathrooms', '1,500 sq ft', 'Backyard', 'Garage'],
  };

  return (
    <div>
      <h2>Details for House ID: {houseId}</h2>
      <p><strong>Address:</strong> {house.address}</p>
      <p><strong>Price:</strong> {house.price}</p>
      <p><strong>Description:</strong> {house.description}</p>
      <ul>
        <strong>Features:</strong>
        {house.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default HouseDetail;
