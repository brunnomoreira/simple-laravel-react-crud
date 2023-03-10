const find = async (id) => {
  const { data: response } = await axios.get(`admin/candidates/${id}`);
  return response.data;
};

const list = async(page, limit, order_by, order_dir, filter_value, filter_field) => {
  const { data: response } = await axios.get('admin/candidates', {
    params: {
      page,
      limit,
      order_by,
      order_dir,
      filter_value,
      filter_field
    }
  });

  return response;
}

const create = async (data) => {
  const { data: response } = await axios.post('admin/candidates', data);
  return response.data;
};

const update = async (id, data) => {
  const { data: response } = await axios.put(`admin/candidates/${id}`, data);
  return response.data;
};

const remove = async (candidates) => {
  const { data: response } = await axios.post(`admin/candidates/bulk-delete`, {candidates});
  return response.data;
};


export default {
  find,
  list,
  create,
  update,
  remove
}