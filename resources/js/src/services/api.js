const login = async (data) => {
    const { data: response } = await axios.post('auth/login', data);
    return response.data;
};

const logout = async () => {
    await axios.post('auth/logout');
};

export default {
    login,
    logout
}