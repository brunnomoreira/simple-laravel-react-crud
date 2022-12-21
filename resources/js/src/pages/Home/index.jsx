import React from 'react';

import {
  Box,
  Grid,
  TextField,
  Container,
  Typography,
  CircularProgress
} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';

import SearchIcon from '@mui/icons-material/Search';

import { useInfiniteQuery } from 'react-query';

import HomeLayout from "@layouts/Home";
import Vacancy from '@components/Vacancy';
import BannerHome from '@components/BannerHome';

import api from '@services/api';

import { useAuth } from '@contexts/AuthContext';


function Home() {
  const auth = useAuth();
  const observerElem = React.useRef(null);
  const [searchText, setSearchText] = React.useState("");

  const query = useInfiniteQuery({
    queryKey: ['vacancies', { searchText }],
    queryFn: async ({pageParam = 1}) => {
      const response = await api.home.vacancies(pageParam, searchText);
      return response;
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.meta.current_page !== lastPage.meta.last_page ? lastPage.meta.current_page + 1 : undefined;
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const handleObserver = React.useCallback((entries) => {
    const [target] = entries
    if(target.isIntersecting) {
      query.fetchNextPage();
    }
  }, [query.fetchNextPage, query.hasNextPage])
  
  React.useEffect(() => {
    const element = observerElem.current
    const option = { threshold: 0 }
  
    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element)
    return () => observer.unobserve(element)
  }, [query.fetchNextPage, query.hasNextPage, handleObserver]);

  React.useEffect(() => {
    query.refetch();
  }, [auth.user]);

  const renderVacancies = () => {
    if(query.isSuccess) {
      return (
        <Grid container spacing={4}>
          {
            query.data.pages.map(page => (
              page.data.map(vacancy => (
                <Vacancy key={vacancy.id} vacancy={vacancy}/>
              ))
            ))
          }
        </Grid>
      );
    }
  }

  const handleOnSubmitSearch = (event) => {
    event.preventDefault();
    setSearchText(event.target.elements.search.value);
  }

  return (
    <HomeLayout>
      <Box>
        <BannerHome />

        <Container 
          component="form" 
          maxWidth="sm" 
          sx={{ pt: 8, display: 'flex' }}
          onSubmit={handleOnSubmitSearch}
        >
          <TextField 
            fullWidth
            name="search" 
            label="Busque uma vaga" 
            variant="outlined"
          />
          <LoadingButton 
            type="submit"
            variant="contained" 
            startIcon={<SearchIcon />}
            loadingPosition="start"
            loading={query.isRefetching}
            sx={{ width: 200, ml: 2 }}
          >
            Buscar
          </LoadingButton>
        </Container>

        <Container sx={{ py: 8 }} maxWidth="md">
          { renderVacancies() }
          <Box ref={observerElem} sx={{display: 'flex', justifyContent: 'center', pt: '50px', pb: '30px'}}>
            {
              query.isFetching || (query.isFetchingNextPage && query.hasNextPage) ? 
                <CircularProgress />
                : 
                <Typography variant="subtitle2" gutterBottom>
                  Não há mais vagas disponíveis
                </Typography>
            }
          </Box>
        </Container>
      </Box>
    </HomeLayout>
  );
}

export default Home;