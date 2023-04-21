export default [
  {
    name: "statusColor",
    execute: (status) => {
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
];
