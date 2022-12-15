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
import { Link as RouterLink } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useForm, Controller } from "react-hook-form";

import AdminLayout from "../../../layouts/Admin";




function VacanciesNew() {
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      summary: '',
      description: '',
      type: 'clt',
      status: 'open'
    }
  });
  const onSubmit = data => console.log(data);

  return (
    <AdminLayout>
      <Box sx={{ maxWidth: 600, width: '100%' }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Nova Vaga</Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                      error={errors.name ? true : false}
                      helperText={errors.name?.message}
                      {...field}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <Controller
                  name="summary"
                  control={control}
                  rules={{ required: "Campo obrigatório" }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Resumo*"
                      margin="normal"
                      error={errors.summary ? true : false}
                      helperText={errors.summary?.message}
                      {...field}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Descrição"
                      margin="normal"
                      {...field}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      select
                      fullWidth
                      label="Tipo"
                      margin="normal"
                      {...field}
                    >
                      <MenuItem value="clt">CLT</MenuItem>
                      <MenuItem value="pessoa_juridica">Pessoa Jurídica</MenuItem>
                      <MenuItem value="freelancer">Freelancer</MenuItem>
                    </TextField>
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      select
                      fullWidth
                      label="Status"
                      margin="normal"
                      {...field}
                    >
                      <MenuItem value="open">Aberta</MenuItem>
                      <MenuItem value="paused">Pausada</MenuItem>
                      <MenuItem value="closed">Fechada</MenuItem>
                    </TextField>
                  )}
                />
              </FormControl>
              <Box sx={{ mt: 3, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  component={RouterLink} 
                  to="/admin/vacancies"
                  color="secondary"
                  variant="contained"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                >
                  Cadastrar
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </AdminLayout>
  );
}

export default VacanciesNew;