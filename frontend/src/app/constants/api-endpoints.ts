export const API_ENDPOINTS = {
  BASE_URL: 'https://servicesarkari.com',

    RECORDS: {
      GET_ALL: '/records',
      GET_BY_ID: (id: string) => `/records/${id}`,
      GET_BY_TYPE: (type: string) => `/records/type/${type}`,
      CREATE: '/records',
      UPDATE: (id: string) => `/records/${id}`,
      DELETE: (id: string) => `/records/${id}`
    }
  };
  