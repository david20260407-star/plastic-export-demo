module.exports = {
  apps: [{
    name: 'plastic-export',
    script: 'npm',
    args: 'start',
    cwd: 'C:\\wwwroot\\plastic-export-demo',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: 'C:\\wwwroot\\plastic-export-demo\\logs\\err.log',
    out_file: 'C:\\wwwroot\\plastic-export-demo\\logs\\out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss'
  }]
};
