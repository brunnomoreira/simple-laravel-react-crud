import React from 'react';

import {
  Box,
  Grid,
  Card,
  Typography,
  CardActions,
  CardContent,
} from '@mui/material';

import { 
  Check as CheckIcon, 
  Close as CloseIcon
} from '@mui/icons-material';

import { LoadingButton } from '@mui/lab';

import { toast } from 'react-toastify';

import { useMutation } from 'react-query';

import { useAuth } from '@contexts/AuthContext';

import api from '@services/api';



const Vacancy = ({vacancy}) => {
  const auth = useAuth();
  const [applied, setApplied] = React.useState(vacancy.applied);

  React.useEffect(() => {
    setApplied(vacancy.applied);
  }, [vacancy.applied, auth.user]);

  const mutationApply = useMutation(async () => await api.candidacies.create(vacancy.id) , {
    onSuccess: data => {
      setApplied(true);
      toast.success("Candidatura realizada com sucesso!");
    },
    onError: (error, variables, context) => {
      toast.error("Erro ao realizar candidatura!");
      console.log(error);
    }
  });

  const mutationRemove = useMutation(async () => await api.candidacies.remove(vacancy.id) , {
    onSuccess: data => {
      setApplied(false);
      toast.success("Candidatura removida com sucesso!");
    },
    onError: (error, variables, context) => {
      toast.error("Erro ao remover candidatura!");
      console.log(error);
    }
  });

  const handleOnClickApply = () => {
    if(auth.isLoggedIn()) {
      mutationApply.mutate();
    }
    else {
      toast.warning("É necessário se autenticar para poder se candidatar à uma vaga.");
    }
  }

  const handleOnClickRemove = () => {
    mutationRemove.mutate();
  }

  const renderOptions = () => {
    if(applied) {
      return (
        <>
          <Typography sx={{ color: "green", mr: 2 }}>
            Candidatura enviada!
          </Typography>
          <LoadingButton 
            size="small" 
            variant="text"
            startIcon={<CloseIcon />}
            loadingPosition="start"
            loading={mutationRemove.isLoading}
            onClick={handleOnClickRemove}
          >
            Remover candidatura
          </LoadingButton>
        </>
      );
    }
    else {
      return (
        <LoadingButton 
          size="small" 
          variant="text"
          startIcon={<CheckIcon />}
          loadingPosition="start"
          loading={mutationApply.isLoading}
          onClick={handleOnClickApply}
        >
          Candidatar-se
        </LoadingButton>
      );
    }
  }

  return (
    <Grid item sm={12}>
      <Card
        sx={{ height: '200px', display: 'flex', flexDirection: 'column' }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography gutterBottom variant="h5" component="h2">
              { vacancy.name }
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
          { renderOptions() }
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Vacancy;