const login = async (data) => {
    const { data: response } = await axios.post('auth/login', data);
    return response.data;
};

const register = async (data) => {
    const { data: response } = await axios.post('auth/register', data);
    return response.data;
};

const logout = async () => {
    await axios.post('auth/logout');
};

const getVacancy = async (id) => {
    const { data: response } = await axios.get(`admin/vacancies/${id}`);
    return response.data;
};

const getVacancies = async(page, limit, order_by, order_dir, filter_value, filter_field) => {
    const { data: response } = await axios.get('admin/vacancies', {
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

const createVacancy = async (data) => {
    const { data: response } = await axios.post('admin/vacancies', data);
    return response.data;
};

const updateVacancy = async (id, data) => {
    const { data: response } = await axios.put(`admin/vacancies/${id}`, data);
    return response.data;
};

const deleteVacancy = async (id) => {
    const { data: response } = await axios.delete(`admin/vacancies/${id}`);
    return response.data;
};

export default {
    login,
    logout,
    register,
    getVacancy,
    getVacancies,
    createVacancy,
    updateVacancy,
    deleteVacancy
}