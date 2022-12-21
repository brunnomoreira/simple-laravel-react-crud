import React from 'react';

import {
  Box,
  Grid,
  Card,
  Button,
  Typography,
  CardActions,
  CardContent,
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';


const Vacancy = ({vacancy}) => {
  const auth = useAuth();
  
  return (
    <Grid item sm={12}>
      <Card
        sx={{ height: '200px', display: 'flex', flexDirection: 'column' }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography gutterBottom variant="h5" component="h2">
              { vacancy.title }
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Cadastrada em { new Date(vacancy.created_at).toLocaleDateString('pt-br') }
            </Typography>
          </Box>
          <Typography>
            { vacancy.summary }
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'end' }}>
          <Button size="small">Candidatar-se</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Vacancy;