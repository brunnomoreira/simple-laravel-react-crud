import React from 'react';

import { 
  Box,
  Link,
  AppBar,
  Button,
  Toolbar
} from '@mui/material';

import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useMutation } from 'react-query';

import { toast } from 'react-toastify';

import { useAuth } from '../../../contexts/AuthContext';
import { useApp } from '../../../contexts/AppContext';
import api from '../../../services/api';


function Header() {
  const app = useApp();
  const auth = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation(api.logout, {
    onMutate: variables => {
      app.setLoading(true);
    },
    onSuccess: data => {
      auth.logout();
      navigate("/");
    },
    onError: (error, variables, context) => {
      toast.error("Erro ao sair");
      console.log(error);
    },
    onSettled: (data, error, variables, context) => {
      app.setLoading(false);
    }
  });

  const renderMenu = () => {
    if(auth.isLoading) {
      return null;
    }

    if(auth.isLoggedIn()) {
      if(auth.isAdmin()) {
        return (
          <>
            <Button component={RouterLink} to="/admin/vacancies" variant="text">Admin</Button>
            <Button variant="text" onClick={handleOnClickLogout}>Sair</Button>
          </>
        );
      }
      else {
        return (
          <>
            <Button variant="text" onClick={handleOnClickLogout}>Sair</Button>
          </>
        );
      }
    }
    else {
      return (
        <>
          <Button component={RouterLink} to="/login" variant="text">Entrar</Button>
          <Button component={RouterLink} to="/register" variant="text">Cadastrar-se</Button>
        </>
      );
    }
  }

  const handleOnClickLogout = () => {
    mutation.mutate();
  }

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#FFF" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link component={RouterLink} to="/">
          <Box
            component="img"
            sx={{
              width: 100
            }}
            alt="Signo Web"
            src="https://site.signoweb.com.br/assets/images/logo-signo.svg"
          />
        </Link>
        <Box>
          { renderMenu() }
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;