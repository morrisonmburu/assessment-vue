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
    getStatusChartColor(status) {
      switch (status) {
        case "New":
          return "#1976d2";
        case "In Progress":
          return "#ff9800";
        case "Ready for Review":
          return "#00bcd4";
        case "Done":
          return "#4caf50";
        default:
          return "#1976d2";
      }
    },
  },
};
