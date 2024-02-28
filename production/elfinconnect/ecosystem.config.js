module.exports = {
  apps : [
    {
    name   : "web",
    cwd    : "./elfinConnectWeb/",
    script : "./index.js",
    env_production: {
      NODE_ENV: "production",
      exec_mode : "cluster",
      instances : "max"
    },
    env_development: {
      NODE_ENV: "development",
      exec_mode : "fork"
    }
  },
  {
    name   : "bridge",
    cwd    : "./elfinConnectServer/",
    script : "./index.js",
    env_production: {
      NODE_ENV: "production",
      exec_mode : "cluster",
      instances : "max"
    },
    env_development: {
      NODE_ENV: "development",
      exec_mode : "fork"
    }
  },
]
}