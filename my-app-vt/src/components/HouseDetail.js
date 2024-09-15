// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './HouseDetail.css'; // Import your CSS file


// const HouseDetail = () => {
//   const { address } = useParams(); // Get the house address from the URL
//   console.log('Address from params:', address);
//   const [house, setHouse] = useState(null); // State to hold house details
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state

//   useEffect(() => {
//     console.log('Fetching house details for address:', address); // Ensure this logs to check if useEffect is working

//     // Function to fetch house details by address
//     const fetchHouseDetails = async () => {
//       try {
//         const response = await fetch('http://25.54.196.118:8080/getHomeEvaluation', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           // Send the address as raw JSON, just like in Postman
//           body: address,
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch house details');
//         }

//         const data = await response.json();
//         console.log('Received data:', data); // Check what data is received from the API

//         setHouse(data); // Set the house data in state
//         setLoading(false); // Disable loading
//       } catch (err) {
//         console.error('Error fetching house details:', err);
//         setError(err.message); // Set error message
//         setLoading(false); // Disable loading
//       }
//     };

//     fetchHouseDetails();
//   }, [address]); // Fetch house details when the address changes

//   if (loading) {
//     return <h5>Loading house details...</h5>;
//   }

//   if (error) {
//     return <h5 style={{ color: 'red' }}>Error: {error}</h5>;
//   }

//   if (!house) {
//     return <h5>No house data found</h5>;
//   }

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Details for {house.address}</h2>

//       {/* Display house details */}
//       <p><strong>Price:</strong> {house.price || 'N/A'}</p>
//       <p><strong>Year Built:</strong> {house.yearBuilt || 'N/A'}</p>
//       <p><strong>Description:</strong> {house.description || 'No description available'}</p>
//       <p><strong>Square Feet:</strong> {house.squareFeet || 'N/A'}</p>

//       <div style={{ marginTop: '20px' }}>
//         <h3>Tax Data</h3>
//         <ul>
//           {house.taxData?.length > 0 ? (
//             house.taxData.map((tax, index) => (
//               <li key={index}>
//                 Year: {tax.year}, Tax Paid: ${tax.taxPaid}, Assessment: ${tax.taxAssessment}, Land: ${tax.land}, Improvement: ${tax.improvement}
//               </li>
//             ))
//           ) : (
//             <p>No tax data available</p>
//           )}
//         </ul>
//       </div>

//       <div style={{ marginTop: '20px' }}>
//         <h3>Highlights</h3>
//         <ul>
//           {house.highlights?.length > 0 ? (
//             house.highlights.map((highlight, index) => <li key={index}>{highlight}</li>)
//           ) : (
//             <p>No highlights available</p>
//           )}
//         </ul>
//       </div>

//       <div style={{ marginTop: '20px' }}>
//         <h3>Investment Insights</h3>
//         <p><strong>Should Buy:</strong> {house.shouldBuy ? 'Yes' : 'No'}</p>
//         <p><strong>Estimated Money Made:</strong> {house.estimatedMoneyBack?.estimatedMoneyMade || 'N/A'}</p>
//       </div>

//       {house.imageUrl && (
//         <div style={{ marginTop: '20px' }}>
//           <h3>House Image</h3>
//           <img src={house.imageUrl} alt="House" style={{ width: '100%', maxWidth: '600px' }} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default HouseDetail;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './HouseDetail.css'; // Import your CSS file

const HouseDetail = () => {
  const { address } = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          <p><strong>Price:</strong> {house.price || 'N/A'}</p>
          <p><strong>Year Built:</strong> {house.yearBuilt || 'N/A'}</p>
          <p><strong>Description:</strong> {house.description || 'No description available'}</p>
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
        <ul>
          {house.taxData?.length > 0 ? (
            house.taxData.map((tax, index) => (
              <li key={index}>
                Year: {tax.year}, Tax Paid: ${tax.taxPaid}, Assessment: ${tax.taxAssessment}, Land: ${tax.land}, Improvement: ${tax.improvement}
              </li>
            ))
          ) : (
            <p>No tax data available</p>
          )}
        </ul>
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


