module.exports = {
  apps : [
    {
    name   : "web",
    cwd    : "./elfinConnectWeb/",
    script : "./index.js",
    env_production: {
      NODE_ENV: "production",
      PORT: 3000,
      DATABASE: "database:27017",
      DATABASE_COLLECTION: "elfinconnect",
      GATEWAY_SERVER_IP: "localhost",
      GATEWAY_SERVER_PORT: 3001,
      GATEWAY_SERVER_TIMEOUT: 30000
    },
    env_development: {
      NODE_ENV: "development",
      PORT: 3000,
      DATABASE: "database:27017",
      DATABASE_COLLECTION: "elfinconnect",
      GATEWAY_SERVER_IP: "localhost",
      GATEWAY_SERVER_PORT: 3001,
      GATEWAY_SERVER_TIMEOUT: 30000
    },
    exec_mode : "fork"
  },
  {
    name   : "bridge",
    cwd    : "./elfinConnectServer/",
    script : "./index.js",
    env_production: {
      NODE_ENV: "production"
    },
    env_development: {
      NODE_ENV: "development"
    },
    exec_mode : "fork"
  },
]
}