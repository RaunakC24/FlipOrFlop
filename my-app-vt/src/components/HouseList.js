import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const HouseList = () => {
  const { cityOrZip } = useParams();
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Static data based on cityOrZip
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

    return (
      <div>
        <Typography variant="h4" gutterBottom>
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
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea component={Link} to={`/${index}`}>
                    {/* Use the house image from the API or a placeholder */}
                    <CardMedia
                      component="img"
                      sx={{ height: 200, width: '100%', objectFit: 'cover' }}
                      image={house.imageUrl || 'https://via.placeholder.com/300x200.png?text=No+Image+Available'}
                      alt={house.address}
                    />
                    <CardContent>
                      {/* House Address */}
                      <Typography gutterBottom variant="h6" component="div">
                        {house.address}
                      </Typography>
                      {/* House Price */}
                      <Typography variant="body2" color="text.secondary">
                        Price: {house.price}
                      </Typography>
                      {/* Display Beds and Baths */}
                      <Typography variant="body2" color="text.secondary">
                        {house.beds}, {house.baths}
                      </Typography>
                      {/* Display Square Feet */}
                      <Typography variant="body2" color="text.secondary">
                        {house.squareFeet}
                      </Typography>
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
