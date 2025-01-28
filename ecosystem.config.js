let _sys = require('./Global/Settings/_system.json');
let botcuk = [
  {
    name: "Mainframe",
    namespace: "KyLockz",
    script: 'main.kylockz',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "1G",
    cwd: "./Server/Voucher"
  },
  {
    name: "Controller",
    namespace: "KyLockz",
    script: 'main.kylockz',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "1G",
    cwd: "./Server/Controller"
  },
  {
    name: "Statistics",
    namespace: "KyLockz",
    script: 'main.kylockz',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "1G",
    cwd: "./Server/Statistics"
  },
  {
    name: "Sync",
    namespace: "KyLockz",
    script: 'main.kylockz',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "1G",
    cwd: "./Server/Sync"
  },
  {
    name: "Security_I",
    namespace: "KyLockz",
    script: 'main.kylockz',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "1G",
    cwd: "./Server/Guard_I"
  },
  {
    name: "Security_II",
    namespace: "KyLockz",
    script: 'main.kylockz',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "1G",
    cwd: "./Server/Guard_II"
  },
  {
    name: "API",
    namespace: "Web Synl.io",
    script: 'main.kylockz',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "1G",
    cwd: "./Server/Web"
  },
  {
    name: "Distributors",
    namespace: "KyLockz",
    script: 'main.kylockz',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "1G",
    cwd: "./Server/Distributors"
  },
  {
    name: "Welcome",
    namespace: "KyLockz",
    script: 'Start.js',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "1G",
    cwd: "./Server/Welcome"
  },
  {
    name: "tokens",
    namespace: "KyLockz",
    script: 'index.js',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "1G",
    cwd: "./Server/tokens"
  },
]

module.exports = {
  apps: botcuk
};