module.exports = {
  apps : [
    {
    name   : "web",
    cwd    : "./elfinConnectWeb/",
    script : "./index.js",
    exec_mode : "cluster",
    instances : "max"
  },
  {
    name   : "bridge",
    cwd    : "./elfinConnectServer/",
    script : "./index.js",
    exec_mode : "cluster",
    instances : "max"
  },
]
}