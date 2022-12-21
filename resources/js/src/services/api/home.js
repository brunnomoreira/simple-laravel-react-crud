const vacancies = async(page, filter_value) => {
  const { data: response } = await axios.get('vacancies', {
    params: {
      page,
      filter_value
    }
  });

  return response;
}

export default {
  vacancies
}