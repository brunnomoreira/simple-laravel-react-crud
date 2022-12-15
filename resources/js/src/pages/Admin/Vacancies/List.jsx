import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { Link as RouterLink } from "react-router-dom";
import MUIDataTable from "mui-datatables";

import AdminLayout from "../../../layouts/Admin";


const columns = ["Name", "Company", "City", "State"];

const data = [
 ["Joe James", "Test Corp", "Yonkers", "NY"],
 ["John Walsh", "Test Corp", "Hartford", "CT"],
 ["Bob Herm", "Test Corp", "Tampa", "FL"],
 ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options = {
  search: true,
  filter: false,
  print: false,
  download: false,
  viewColumns: false,
  selectableRows: 'none',
  customToolbar: () => {
    return (
      <Tooltip title={"Nova"}>
        <IconButton component={RouterLink} to="/admin/vacancies/new">
          <AddIcon />
        </IconButton>
      </Tooltip>
    );
  },
  customSearchRender: (searchText, handleSearch, hideSearch, options) => {
    return (
      <Box sx={{display: 'flex'}}>
        <TextField size="small" sx={{mr: 2}}/>
        <Button variant="contained">Buscar</Button>
      </Box>
    );
  }
};


function VacanciesList() {
  return (
    <AdminLayout>
      <Box sx={{width: '100%'}}>
        <MUIDataTable
          title={"Vagas"}
          data={data}
          columns={columns}
          options={options}
        />
      </Box>
    </AdminLayout>
  );
}

export default VacanciesList;