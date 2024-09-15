import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import '.././HouseList.css';  // Import the CSS file

const HouseList = () => {
  const { cityOrZip } = useParams();
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Image paths for the ratings (1 to 5)
  const ratingImages = [
    '/rating1.png',
    '/rating2.png',
    '/rating3.png',
    '/rating4.png',
    '/rating5.png',
  ];

  useEffect(() => {
    // Fetch house data
    fetch('http://25.54.196.118:8080/getListOfHomes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: cityOrZip, // Send the city or zip code in the body
    })
      .then(response => response.json())
      .then(data => {
        setHouses(data); // Set the fetched data to state
        setLoading(false); // Disable the loading state
      })
      .catch(error => {
        console.error('Error fetching house data:', error);
        setLoading(false);
      });
  }, [cityOrZip]);

  if (loading) {
    return <Typography variant="h5">Loading houses...</Typography>;
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
  

  return (
    <div className="house-list-container">
      <Typography className="house-list-header" variant="h4" gutterBottom>
        Houses in {cityOrZip}
      </Typography>

      {/* Wrap the grid with a Box for margin and padding */}
      <Box sx={{ paddingX: 4, marginLeft: 9, marginBottom: 4 }}>
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
          alignItems="center"
        >
          {houses.map((house, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card className="house-card">
                <CardActionArea 
                  component={Link} 
                  to={`/home/${encodeURIComponent(house.address)}?rating=${house.rating}`}
                >
                  {/* Use the house image from the API or a placeholder */}
                  <CardMedia
                    component="img"
                    className="house-card-image"
                    image={house.imageUrl || 'https://via.placeholder.com/300x200.png?text=No+Image+Available'}
                    alt={house.address}
                  />
                  <CardContent className="house-card-content">
                    <div>
                      {/* House Address */}
                      <Typography gutterBottom variant="h6" component="div">
                        {house.address}
                      </Typography>
                      {/* House Price */}
                      <Typography className="house-price" variant="body2" color="text.secondary">
                        Price: {house.price}
                      </Typography>
                      {/* Display Beds and Baths */}
                      <Typography className="house-details" variant="body2" color="text.secondary">
                        {house.beds}, {house.baths}
                      </Typography>
                      {/* Display Square Feet */}
                      <Typography className="house-details" variant="body2" color="text.secondary">
                        {house.squareFeet}
                      </Typography>
                    </div>
                    {/* Render Rating Images */}
                    <div className="rating-container">
                      {renderRatingImages(house.rating)}
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default HouseList;
