export default {
  books: {
    readList: `${process.env.VUE_APP_API_URL}/books`,
    add: `${process.env.VUE_APP_API_URL}/books`,
    update: `${process.env.VUE_APP_API_URL}/books`,
    getBookById: (id) => `${process.env.VUE_APP_API_URL}/books/${id}`,
    delete: `${process.env.VUE_APP_API_URL}/books`,
  },
  authors: {
    readList: `${process.env.VUE_APP_API_URL}/authors`,
    add: `${process.env.VUE_APP_API_URL}/authors`,
    update: `${process.env.VUE_APP_API_URL}/authors`,
    getAuthorById: (id) => `${process.env.VUE_APP_API_URL}/authors/${id}`,
    delete: `${process.env.VUE_APP_API_URL}/authors`,
  },
};
