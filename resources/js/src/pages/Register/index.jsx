import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import { Link as RouterLink, useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/Home";
import { useMutation } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../services/api';

function Register() {
  const navigate = useNavigate();
  const authContext = React.useContext(AuthContext);
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  });

  const mutation = useMutation(api.register, {
    onSuccess: data => {
      authContext.login(data);
      navigate("/");
    },
    onError: (error, variables, context) => {
      console.log("Deu ruim");
      console.log(error);
    }
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  }
  
  return (
    <HomeLayout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastre-se
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    autoFocus
                    fullWidth
                    label="Nome*"
                    margin="normal"
                    autoComplete="family-name"
                    error={errors.name ? true : false}
                    helperText={errors.name?.message}
                    {...field}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    autoFocus
                    fullWidth
                    label="Email*"
                    margin="normal"
                    autoComplete="email"
                    error={errors.email ? true : false}
                    helperText={errors.email?.message}
                    {...field}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth>
              <Controller
                name="password"
                control={control}
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Senha*"
                    margin="normal"
                    type="password"
                    autoComplete="new-password"
                    error={errors.password ? true : false}
                    helperText={errors.password?.message}
                    {...field}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth>
              <Controller
                name="password_confirmation"
                control={control}
                rules={{ 
                  required: "Campo obrigatório",
                  validate: (val) => {
                    if (watch('password') != val) {
                      return "Confirmação de senha não corresponde a senha";
                    }
                  },
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Confirme sua senha*"
                    margin="normal"
                    type="password"
                    autoComplete="new-password"
                    error={errors.password_confirmation ? true : false}
                    helperText={errors.password_confirmation?.message}
                    {...field}
                  />
                )}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Já tem uma conta? Entrar
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </HomeLayout>
  );
}

export default Register;