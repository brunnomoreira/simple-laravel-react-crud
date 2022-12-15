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

import { useForm, Controller } from "react-hook-form";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import HomeLayout from "../../layouts/Home";
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';

function Login() {
  const navigate = useNavigate();
  const authContext = React.useContext(AuthContext);
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const mutation = useMutation(api.login, {
    onSuccess: data => {
      console.log("Deu bom");
      console.log(data);
      authContext.login(data);
      navigate("/");
    },
    onError: (error, variables, context) => {
      console.log("Deu ruim");
      console.log(error);
    }
  });

  const onSubmit = (data) => {
    console.log("Agora");
    console.log(data);
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