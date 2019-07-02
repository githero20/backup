module.exports = {
  apps : [
    {
      name      : "backup-cash",
      script    : "npx",
      interpreter: "none",
      args: "serve -p 3000 -s build"
    }
  ]
};
