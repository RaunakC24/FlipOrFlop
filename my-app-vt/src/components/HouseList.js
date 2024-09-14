// src/components/HouseList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const HouseList = () => {
  const { cityOrZip } = useParams();

  // Sample static data for houses in that city or ZIP
  const houses = [
    { id: 1, address: '123 Main St', price: '$400,000', city: cityOrZip },
    { id: 2, address: '456 Oak St', price: '$500,000', city: cityOrZip },
    { id: 3, address: '789 Pine St', price: '$350,000', city: cityOrZip },
  ];

  return (
    <div>
      <h2>Houses in {cityOrZip}</h2>
      <ul>
        {houses.map((house) => (
          <li key={house.id}>
            <Link to={`/house/${house.id}`}>
              {house.address} - {house.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HouseList;
