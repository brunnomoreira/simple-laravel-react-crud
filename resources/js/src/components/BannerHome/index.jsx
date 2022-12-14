import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Container from './Container';

//const backgroundImage = 'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400';
const backgroundImage = "../../../../images/banner-home.jpg";

function BannerHome() {
  return (
    <Container
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Vagas Disponíveis
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Encontre aqui a vaga que você sempre sonhou!
      </Typography>
      <Button
        variant="contained"
        size="large"
        component="a"
        href="/premium-themes/onepirate/sign-up/"
        sx={{ minWidth: 200 }}
      >
        Cadastre-se
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Descubra um novo mundo
      </Typography>
    </Container>
  );
}

export default BannerHome;