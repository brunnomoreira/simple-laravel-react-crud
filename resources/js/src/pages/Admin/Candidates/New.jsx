import React from 'react';

import { 
  Box,
  Card,
  Button,
  MenuItem,
  TextField, 
  Typography,
  FormControl, 
  CardContent,
} from '@mui/material';

import { toast } from 'react-toastify';

import { useMutation } from 'react-query';

import { useForm, Controller } from "react-hook-form";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import AdminLayout from "../../../layouts/Admin";
import { useApp } from '../../../contexts/AppContext';
import api from '../../../services/api';


function CandidatesNew() {
  const app = useApp();
  const navigate = useNavigate();

  const { handleSubmit, watch, control, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  });
  
  const mutation = useMutation(api.candidates.create, {
    onMutate: variables => {
      app.setLoading(true);
    },
    onSuccess: data => {
      toast.success("Candidato criado com sucesso!");
      navigate("/admin/candidates");
    },
    onError: (error, variables, context) => {
      toast.error("Erro ao criar candidato");
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
    <AdminLayout>
      <Box sx={{ maxWidth: 600, width: '100%' }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Novo Candidato</Typography>
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
                  name="email"
                  control={control}
                  rules={{ required: "Campo obrigatório" }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      type="email"
                      label="Email*"
                      margin="normal"
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

              <Box sx={{ mt: 3, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  component={RouterLink} 
                  to="/admin/candidates"
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

export default CandidatesNew;