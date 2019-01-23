1. set up docker - https://docs.docker.com/install/linux/docker-ce/ubuntu/ and docker compose (edited) 
2. `git clone https://github.com/tghosth/CTFd-docker-deploy.git`
3. add TLS `ctfd.crt` and `ctfd.key` to ssl
4. Edit the hostname line in the `docker-compose-production.yml`
5. `docker-compose -f docker-compose-production.yml up`
