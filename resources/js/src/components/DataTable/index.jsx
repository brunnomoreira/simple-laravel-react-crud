import React from 'react';

import { 
  Box,
  Button,
  Select,
  Tooltip, 
  Checkbox, 
  MenuItem,
  TextField, 
  IconButton,
  InputLabel,
  FormControl, 
  ListItemText,
  OutlinedInput, 
  CircularProgress,
} from '@mui/material';

import {
  Add as AddIcon
} from "@mui/icons-material";

import MUIDataTable from "mui-datatables";


function DataTable({ 
  title, 
  query, 
  columns, 
  onClickNew, 
  columnsToSearch,
  rowsPerPage,
  setRowsPerPage,
  setPage,
  setSortOrder,
  setSortColumn,
  setSearchText,
  setSearchColumns
}) {
  const [searchTextTemp, setSearchTextTemp] = React.useState("");
  const [searchColumnsTemp, setSearchColumnsTemp] = React.useState([]);


  React.useEffect(() => {
    if(!query.isLoading || !query.isRefetching) {
      query.refetch();
    }
  }, []);

  const options = {
    count: query.data ? query.data.meta.total : 0,
    serverSide: true,
    search: true,
    filter: false,
    print: false,
    download: false,
    viewColumns: false,
    rowsPerPage: rowsPerPage,
    rowsPerPageOptions: [10, 15, 20, 100],
    textLabels: {
      body: {
        noMatch: query.isLoading ? 'Carregando...' : 'Nenhum dado encontrado.',
      },
    },
    customToolbar: () => {
      return (
        <Tooltip title={"Nova"}>
          <IconButton onClick={onClickNew}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      );
    },
    customSearchRender: (searchText, handleSearch, hideSearch, options) => {
      return (
        <Box component="form" onSubmit={handleOnSubmitSearch} sx={{display: 'flex', alignItems: 'center'}}>
          <FormControl size="small" sx={{ m: 1, width: 150 }}>
            <InputLabel id="searchColumnsLabel" sx={{ bgcolor: '#FFF' }}>Buscar por</InputLabel>
            <Select
              multiple
              value={searchColumnsTemp}
              labelId="searchColumnsLabel"
              onChange={event => setSearchColumnsTemp(event.target.value)}
              input={<OutlinedInput label="Chip" />}
              renderValue={(selected) => selected.join(', ')}
            >
              {
                columnsToSearch.map(column => (
                  <MenuItem key={column.value} value={column.value}>
                    <Checkbox checked={searchColumnsTemp.includes(column.value)} />
                    <ListItemText primary={column.label} />
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
          
          <TextField 
            value={searchTextTemp}
            size="small" 
            variant="outlined" 
            sx={{flexGrow: 1, mx: 1}}
            onChange={event => setSearchTextTemp(event.target.value)}
          />

          <Button type="submit" variant="contained">Buscar</Button>
        </Box>
      );
    },
    onChangePage: (currentPage) => {
      if (!query.isPreviousData) {
        setPage(currentPage+1);
      }
    },
    onColumnSortChange: (changedColumn, direction) => {
      setSortColumn(changedColumn);
      setSortOrder(direction);
    },
    onChangeRowsPerPage: (numberOfRows) => {
      setPage(1)
      setRowsPerPage(numberOfRows);
    }
  };

  const handleOnSubmitSearch = (event) => {
    event.preventDefault();
    setSearchText(searchTextTemp);
    setSearchColumns(searchColumnsTemp);
  }

  return (
    <Box sx={{width: '100%', position: 'relative'}}>
      {
        (query.isLoading || query.isRefetching)
        &&
        <Box sx={{
          position: 'absolute', 
          top: 133, 
          bottom: 54, 
          left: 0, 
          right: 0, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          background: '#000',
          opacity: 0.3,
          zIndex: 999
        }}>
          <CircularProgress sx={{color: '#FFF'}} />
        </Box>
      }
      <MUIDataTable
        title={title}
        data={query.data ? query.data.data : []}
        options={options}
        columns={columns}
      />
    </Box>
  );
}

export default DataTable;