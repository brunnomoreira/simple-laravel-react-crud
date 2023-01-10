import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useQuery, useMutation } from 'react-query';

import { toast } from 'react-toastify';

import { useApp } from '@contexts/AppContext';

const usePagination = (resource) => {
  const app = useApp();
  const [page, setPage] = React.useState(1);
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
      const response = await resource.list(page, rowsPerPage, sortColumn, sortOrder, searchText, searchColumns.join(','));
      return response;
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const mutation = useMutation(async (ids) => await resource.remove(ids) , {
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

  return {
    query,
    mutation,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    setSortOrder,
    setSortColumn,
    setSearchText,
    setSearchColumns,
    selectedIdsToDelete,
    setSelectedIdsToDelete
  };
}

export default usePagination;