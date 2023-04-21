export default {
  methods: {
    prepareFormData(formData) {
      const data = new FormData();
      for (const key in formData) {
        if (formData[key] === null) formData[key] = "";
        data.append(key, formData[key]);
      }
      return data;
    },
    getStatusColor(status) {
      switch (status) {
        case "New":
          return "primary";
        case "In Progress":
          return "orange darken-1";
        case "Ready for Review":
          return "cyan darken-1";
        case "Done":
          return "green darken-1";
        default:
          return "primary";
      }
    },
  },
};
