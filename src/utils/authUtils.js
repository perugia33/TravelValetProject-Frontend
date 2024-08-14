export const updateAuthHeaders = (auth, clientApi) => {
  if (auth) {
    clientApi.defaults.headers.common['Authorization'] = `Bearer ${auth}`;
  } else {
    delete clientApi.defaults.headers.common['Authorization'];
  }
};