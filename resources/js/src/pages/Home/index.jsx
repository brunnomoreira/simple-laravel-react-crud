import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

import HomeLayout from "../../layouts/Home";
import BannerHome from '../../components/BannerHome';

function Home() {
  return (
    <HomeLayout>
      <Box>
        <BannerHome />

        <Container maxWidth="sm" sx={{ pt: 8, display: 'flex' }}>
          <TextField fullWidth label="Busque uma vaga" variant="outlined" />
          <Button variant="contained" sx={{ width: 200, ml: 2 }}>Buscar</Button>
        </Container>

        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            <Grid item sm={12}>
              <Card
                sx={{ height: '200px', display: 'flex', flexDirection: 'column' }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Est alias provident.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Cadastrada em 15/10/2022
                    </Typography>
                  </Box>
                  <Typography>
                    Eos dolorem libero quam delectus non vitae distinctio. Ullam eaque veritatis dolorem neque.
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'end' }}>
                  <Button size="small">Candidatar-se</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </HomeLayout>
  );
}

export default Home;