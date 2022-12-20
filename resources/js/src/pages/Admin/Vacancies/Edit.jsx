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

import { useMutation, useQuery } from 'react-query';

import { useForm, Controller } from "react-hook-form";

import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../../layouts/Admin";
import api from '../../../services/api';
import { useApp } from '../../../contexts/AppContext';


function VacanciesEdit() {
  const params = useParams();
  const navigate = useNavigate();
  const app = useApp();

  const { reset, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      summary: '',
      description: '',
      type: 'clt',
      status: 'open'
    }
  });

  const query = useQuery({
    queryKey: ['vacancy'],
    queryFn: async () => await api.getVacancy(params.id),
    refetchOnWindowFocus: false
  });

  React.useEffect(() => {
    if(query.isLoading || query.isFetching) {
      app.setLoading(true);
    }
    else {
      if(query.isSuccess) {
        reset(query.data);
      } 

      app.setLoading(false);
    }
  }, [query.isLoading, query.isFetching, query.isSuccess]);
  
  const mutation = useMutation(async (data) => await api.updateVacancy(query.data.id, data), {
    onMutate: variables => {
      app.setLoading(true);
    },
    onSuccess: data => {
      toast.success("Vaga atualizada com sucesso!");
      navigate("/admin/vacancies");
    },
    onError: (error, variables, context) => {
      toast.success("Erro ao atualizar vaga");
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
                  rules={{ required: "Campo obrigatório" }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Descrição"
                      margin="normal"
                      error={errors.description ? true : false}
                      helperText={errors.description?.message}
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
                  Salvar
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </AdminLayout>
  );
}

export default VacanciesEdit;