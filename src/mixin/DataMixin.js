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
  },
};
