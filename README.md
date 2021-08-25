# Instalar Dependências 
# npm install || yarn

# Instalar Docker
# sudo apt install docker.io

# Instalar Docker-Compose
# sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# sudo chmod +x /usr/local/bin/docker-compose

# Desativar Postgresql local
# sudo systemctl disable postgresql
# sudo ss -lptn 'sport = :5432'
# sudo kill (processid do postgresql)

# Rodar serviços do Docker (na raiz do projeto)
# sudo docker-compose up -d --build --force-recreate

# Rodar migrations do typeorm
# yarn typeorm migration:run

# Entrar no banco de dados (Sugestão: Beekeeper)
# username: easyjob,
# password: easyjobdb,
# database: easyjobapi,
