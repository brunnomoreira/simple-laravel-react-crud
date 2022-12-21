const create = async(vacancy_id) => {
  const { data: response } = await axios.post(`candidacies/${vacancy_id}`);
  return response;
}

const remove = async(vacancy_id) => {
  const { data: response } = await axios.delete(`candidacies/${vacancy_id}`);
  return response;
}

export default {
  create,
  remove
}