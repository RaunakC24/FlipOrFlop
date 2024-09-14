// src/components/HouseList.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const HouseList = () => {
  const { cityOrZip } = useParams();
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    // Static data based on cityOrZip
    const houseData = [
      { id: 1, address: '123 Main St', price: '$400,000', city: cityOrZip },
      { id: 2, address: '456 Oak St', price: '$500,000', city: cityOrZip },
      { id: 3, address: '789 Pine St', price: '$350,000', city: cityOrZip },
    ];

    // Set the static houses based on the search term
    setHouses(houseData);
  }, [cityOrZip]);  // Re-run when cityOrZip changes

  return (
    <div>
      <h2>Houses in {cityOrZip}</h2>
      <ul>
        {houses.map((house) => (
          <li key={house.id}>
            <Link to={`/${house.id}`}>
              {house.address} - {house.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HouseList;
