import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useMutation } from 'react-query';

import { AuthContext } from '../../../contexts/AuthContext';
import api from '../../../services/api';
import { useApp } from '../../../contexts/AppContext';
import { toast } from 'react-toastify';

function Header() {
  const app = useApp();
  const navigate = useNavigate();
  const authContext = React.useContext(AuthContext);

  const mutation = useMutation(api.logout, {
    onMutate: variables => {
      app.setLoading(true);
    },
    onSuccess: data => {
      authContext.logout();
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
    if(authContext.isLoading) {
      return null;
    }

    if(authContext.isLoggedIn()) {
      if(authContext.isAdmin()) {
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