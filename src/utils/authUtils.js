export const updateAuthHeaders = (auth, expensesApi) => {
  if (auth) {
    expensesApi.defaults.headers.common['Authorization'] = `Bearer ${auth}`;
  } else {
    delete expensesApi.defaults.headers.common['Authorization'];
  }
};