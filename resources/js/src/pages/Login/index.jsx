import * as React from 'react';

import { 
  Box,
  Link,
  Grid,
  Avatar,
  Button,
  Checkbox,
  Container,
  TextField, 
  Typography,
  FormControl, 
  CssBaseline,
  FormControlLabel
} from '@mui/material';

import {
  LockOutlined as LockOutlinedIcon
} from "@mui/icons-material";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";

import { useMutation } from 'react-query'

import { toast } from 'react-toastify';

import HomeLayout from "@layouts/Home";

import { useAuth } from '@contexts/AuthContext';
import { useApp } from '@contexts/AppContext';

import api from '@services/api';


function Login() {
  const app = useApp();
  const auth = useAuth();
  const navigate = useNavigate();
  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const mutation = useMutation(api.auth.login, {
    onMutate: variables => {
      app.setLoading(true);
    },
    onSuccess: data => {
      auth.login(data);
      navigate("/");
    },
    onError: (error, variables, context) => {
      toast.error("Erro ao entrar");
      console.log(error);
    },
    onSettled: (data, error, variables, context) => {
      app.setLoading(false);
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
            Acesse sua conta
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    autoFocus
                    fullWidth
                    label="Email"
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
                    label="Senha"
                    margin="normal"
                    type="password"
                    autoComplete="password"
                    error={errors.password ? true : false}
                    helperText={errors.password?.message}
                    {...field}
                  />
                )}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Manter conectado"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu sua senha?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2">
                  Não tem uma conta? Cadastre-se!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </HomeLayout>
  );
}

export default Login;