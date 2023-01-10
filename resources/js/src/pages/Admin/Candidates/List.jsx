import React from 'react';

import { 
  Box,
  Tooltip, 
  IconButton,
} from '@mui/material';

import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from "@mui/icons-material";

import { useNavigate } from 'react-router-dom';

import { useQuery, useMutation } from 'react-query';

import { toast } from 'react-toastify';

import AdminLayout from '@layouts/Admin';

import DataTable from '@components/DataTable';
import ConfirmationDialog from '@components/Dialogs/ConfirmationDialog';

import { useApp } from '@contexts/AppContext';

import api from '@services/api';
import usePagination from '@hooks/usePagination';


function CandidatesList() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const pagination = usePagination(api.candidates);


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
                <IconButton onClick={() => handleOnClickUpdate(pagination.query.data.data[tableMeta.rowIndex])}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Remover">
                <IconButton onClick={() => handleOnClickDelete(pagination.query.data.data[tableMeta.rowIndex])}>
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
    pagination.setSelectedIdsToDelete([candidate.id]);
  }

  const handleOnClickConfirmDelete = () => {
    setOpen(false);
    pagination.mutation.mutate(pagination.selectedIdsToDelete);
  }

  const handleOnClickBulkDelete = (indexes) => {
    setOpen(true);
    pagination.setSelectedIdsToDelete(indexes.map(index => pagination.query.data.data[index].id));
  }

  return (
    <AdminLayout>
      <DataTable
        title="Candidatos"
        query={pagination.query}
        columns={columns}
        onClickNew={handleOnClickNew}
        onClickBulDelete={handleOnClickBulkDelete}
        columnsToSearch={columnsToSearch}
        setPage={pagination.setPage}
        rowsPerPage={pagination.rowsPerPage}
        setRowsPerPage={pagination.setRowsPerPage}
        setSortOrder={pagination.setSortOrder}
        setSortColumn={pagination.setSortColumn}
        setSearchText={pagination.setSearchText}
        setSearchColumns={pagination.setSearchColumns}
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