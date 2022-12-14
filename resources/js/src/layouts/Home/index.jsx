import Box from '@mui/material/Box';

import Header from "./Header";
import Footer from "./Footer";

function HomeLayout(props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      { props.children }
      <Footer />
    </Box>
  );
}

export default HomeLayout;