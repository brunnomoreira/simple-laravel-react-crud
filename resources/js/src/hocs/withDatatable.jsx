import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useQuery, useMutation } from 'react-query';

import { toast } from 'react-toastify';

import { useApp } from '@contexts/AppContext';


const withDatatable = (WrappedComponent, fetchFC, removeFC, newRoute, editRoute) => {
  return (props) => {
    const app = useApp();
    const navigate = useNavigate();
    const [page, setPage] = React.useState(1);
    const [open, setOpen] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
    const [sortOrder, setSortOrder] = React.useState("desc");
    const [sortColumn, setSortColumn] = React.useState("id");
    const [searchText, setSearchText] = React.useState("");
    const [searchColumns, setSearchColumns] = React.useState([]);
    const [selectedIdsToDelete, setSelectedIdsToDelete] = React.useState([]);
  
    React.useEffect(() => {
      if(!query.isLoading || !query.isRefetching) {
        query.refetch();
      }
    }, []);
  
    const query = useQuery({
      queryKey: ['fetch', {page, rowsPerPage, sortColumn, sortOrder, searchText, searchColumns}],
      queryFn: async () => {
        const response = await fetchFC(page, rowsPerPage, sortColumn, sortOrder, searchText, searchColumns.join(','));
        return response;
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    });
  
    const mutation = useMutation(async (ids) => await removeFC(ids) , {
      onMutate: variables => {
        app.setLoading(true);
      },
      onSuccess: data => {
        toast.success(selectedIdsToDelete.length > 1 ? "Entradas removidas com sucesso!" : "Entrada removida com sucesso!");
        query.refetch();
      },
      onError: (error, variables, context) => {
        toast.error("Erro ao remover entrada");
        console.log(error);
      },
      onSettled: (data, error, variables, context) => {
        app.setLoading(false);
      }
    });

    const handleOnClickNew = () => {
      navigate(newRoute);
    }
  
    const handleOnClickUpdate = (item) => {
      navigate(`${editRoute}/${item.id}`);
    }
  
    const handleOnClickDelete = (item) => {
      setOpen(true);
      setSelectedIdsToDelete([item.id]);
    }
  
    const handleOnClickConfirmDelete = () => {
      setOpen(false);
      mutation.mutate(selectedIdsToDelete);
    }
  
    const handleOnClickBulkDelete = (indexes) => {
      setOpen(true);
      setSelectedIdsToDelete(indexes.map(index => query.data.data[index].id));
    }
    
    return (
      <WrappedComponent
        query={query}
        mutation={mutation}
        page={page}
        setPage={setPage}
        open={open}
        setOpen={setOpen}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortColumn={sortColumn}
        setSortColumn={setSortColumn}
        searchText={searchText}
        setSearchText={setSearchText}
        searchColumns={searchColumns}
        setSearchColumns={setSearchColumns}
        handleOnClickNew={handleOnClickNew}
        handleOnClickUpdate={handleOnClickUpdate}
        handleOnClickDelete={handleOnClickDelete}
        handleOnClickConfirmDelete={handleOnClickConfirmDelete}
        handleOnClickBulkDelete={handleOnClickBulkDelete}
        {...props}
      />
    );
  }
}

export default withDatatable;