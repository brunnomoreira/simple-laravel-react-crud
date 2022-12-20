import React from 'react';

import { useNavigate } from "react-router-dom";

import { 
  Box,
  Tooltip, 
  IconButton,
} from '@mui/material';

import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from "@mui/icons-material";

import { useQuery, useMutation } from 'react-query';

import { toast } from 'react-toastify';

import AdminLayout from "../../../layouts/Admin";
import DataTable from '../../../components/DataTable';
import ConfirmationDialog from '../../../components/Dialogs/ConfirmationDialog';
import { useApp } from '../../../contexts/AppContext';

import api from '../../../services/api';


function CandidatesList() {
  const app = useApp();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [sortOrder, setSortOrder] = React.useState("desc");
  const [sortColumn, setSortColumn] = React.useState("id");
  const [searchText, setSearchText] = React.useState("");
  const [searchColumns, setSearchColumns] = React.useState([]);

  const [selectedCandidateToDelete, setSelectedCandidateToDelete] = React.useState(null);

  React.useEffect(() => {
    if(!query.isLoading || !query.isRefetching) {
      query.refetch();
    }
  }, []);

  const query = useQuery({
    queryKey: ['candidates', {page, rowsPerPage, sortColumn, sortOrder, searchText, searchColumns}],
    queryFn: async () => {
      const response = await api.candidates.list(page, rowsPerPage, sortColumn, sortOrder, searchText, searchColumns.join(','));
      return response;
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const mutation = useMutation(async (id) => await api.candidates.remove(id) , {
    onMutate: variables => {
      app.setLoading(true);
    },
    onSuccess: data => {
      toast.success("Candidato removido com sucesso!");
      query.refetch();
    },
    onError: (error, variables, context) => {
      toast.error("Erro ao remover candidato");
      console.log(error);
    },
    onSettled: (data, error, variables, context) => {
      app.setLoading(false);
    }
  });

  const columnsToSearch = [
    {value: 'id', label: 'ID'},
    {value: 'name', label: 'Nome'},
    {value: 'email', label: 'Email'}
  ];

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "name",
      label: "Nome",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "created_at",
      label: "Criado em",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          return new Date(value).toLocaleDateString('pt-br');
        }
      }
    },
    {
      name: "options",
      label: "",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <Box>
              <Tooltip title="Editar">
                <IconButton onClick={() => handleOnClickUpdate(query.data.data[tableMeta.rowIndex])}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Remover">
                <IconButton onClick={() => handleOnClickDelete(query.data.data[tableMeta.rowIndex])}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          );
        }
      }
    }
  ];

  const handleOnClickNew = () => {
    navigate('/admin/candidates/new');
  }

  const handleOnClickUpdate = (candidate) => {
    navigate(`/admin/candidates/edit/${candidate.id}`);
  }

  const handleOnClickDelete = (candidate) => {
    setOpen(true);
    setSelectedCandidateToDelete(candidate);
  }

  const handleOnClickConfirmDelete = () => {
    setOpen(false);
    mutation.mutate(selectedCandidateToDelete.id);
  }

  return (
    <AdminLayout>
      <DataTable
        title="Candidatos"
        query={query}
        columns={columns}
        onClickNew={handleOnClickNew}
        columnsToSearch={columnsToSearch}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        setSortOrder={setSortOrder}
        setSortColumn={setSortColumn}
        setSearchText={setSearchText}
        setSearchColumns={setSearchColumns}
      />
      <ConfirmationDialog
        open={open}
        title="Tem certeza?"
        description="Deseja realmente remover os itens selecionados?"
        onClose={() => setOpen(false)}
        onConfirm={handleOnClickConfirmDelete}
      />
    </AdminLayout>
  );
}

export default CandidatesList;