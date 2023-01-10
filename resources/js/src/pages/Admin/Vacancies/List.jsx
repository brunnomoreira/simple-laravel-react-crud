import React from 'react';

import { 
  Box,
  Tooltip, 
  IconButton,
} from '@mui/material';

import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';

import { useQuery, useMutation } from 'react-query';

import { toast } from 'react-toastify';

import AdminLayout from '@layouts/Admin';

import DataTable from '@components/DataTable';
import ConfirmationDialog from '@components/Dialogs/ConfirmationDialog';

import { useApp } from '@contexts/AppContext';

import api from '@services/api';
import withDatatable from '../../../hocs/withDatatable';


function VacanciesList(props) {
  console.log("Aqui");
  console.log(props);

  const columnsToSearch = [
    {value: 'id', label: 'ID'},
    {value: 'name', label: 'Nome'},
    {value: 'type', label: 'Tipo'},
    {value: 'status', label: 'Status'},
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
      name: "type",
      label: "Tipo",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          return props.query.data.data[tableMeta.rowIndex].type_description;
        }
      }
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          return props.query.data.data[tableMeta.rowIndex].status_description;
        }
      }
    },
    {
      name: "created_at",
      label: "Criada em",
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
                <IconButton onClick={() => props.handleOnClickUpdate(props.query.data.data[tableMeta.rowIndex])}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Remover">
                <IconButton onClick={() => props.handleOnClickDelete(props.query.data.data[tableMeta.rowIndex])}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          );
        }
      }
    }
  ];

  return (
    <AdminLayout>
      <DataTable
        title="Vagas"
        query={props.query}
        columns={columns}
        onClickNew={props.handleOnClickNew}
        onClickBulDelete={props.handleOnClickBulkDelete}
        columnsToSearch={columnsToSearch}
        setPage={props.setPage}
        rowsPerPage={props.rowsPerPage}
        setRowsPerPage={props.setRowsPerPage}
        setSortOrder={props.setSortOrder}
        setSortColumn={props.setSortColumn}
        setSearchText={props.setSearchText}
        setSearchColumns={props.setSearchColumns}
      />
      <ConfirmationDialog
        open={props.open}
        title="Tem certeza?"
        description="Deseja realmente remover os itens selecionados?"
        onClose={() => props.setOpen(false)}
        onConfirm={props.handleOnClickConfirmDelete}
      />
    </AdminLayout>
  );
}

export default withDatatable(
  VacanciesList, 
  api.vacancies.list, 
  api.vacancies.remove, 
  '/admin/vacancies/new', 
  '/admin/vacancies/edit'
);