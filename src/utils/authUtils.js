export const updateAuthHeaders = (auth, clientApi) => {
  console.log ('Udating headers with auth', auth)
  if (auth) {
    clientApi.defaults.headers.common['Authorization'] = `Bearer ${auth}`;
  } else {
    delete clientApi.defaults.headers.common['Authorization'];
  }
};