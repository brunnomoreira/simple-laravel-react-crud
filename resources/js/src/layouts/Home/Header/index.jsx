import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { Link as RouterLink } from "react-router-dom";

function Header() {
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
          <Button component={RouterLink} to="/login" variant="text">Entrar</Button>
          <Button component={RouterLink} to="/register" variant="text">Cadastrar-se</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;