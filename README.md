# nestjs-codebase
[![CI OnSen on BE](https://github.com/hailt-2586/onSen-base-project/actions/workflows/ci.yml/badge.svg)](https://github.com/hailt-2586/onSen-base-project/actions/workflows/ci.yml)

### 1. Clone repository
`https://github.com/the-cev7/nestjs-codebase.git`

### 2. Setup project with docker

- Start docker with docker compose `docker-compose.yml`

```
cp .env.example .env
docker-compose up -d
```

- Database migrate run the following commands inside docker

```
yarn migration:run
```

Then, run the following commands inside docker
```
yarn & yarn dev
```

### 3. Access to localhost
- Create user
```bash
curl -X POST 'localhost:3000/user/store' \
 -H 'accept: application/json' \
 -H 'content-type: application/json' \
 -d '{
    "public_address": "0x30E0400C901EE7ec14f1CbD26a7C94152D8AF29d",
    "nonce" : "4MIjEPaL0DKZNBv5L1wwjGreL6skhdQh"
}'

### 4. Stop container
```
$ docker-compose down
```

### 5. Setup database
- Create new table with commands inside docker
```
name=create_nameTables_table yarn migration:create
```

- Generate all entities with commands inside docker
```
name=create_current_table yarn migration:generate
```

### 6. Testing
- Run commands inside docker
```
yarn test
```

## Feature list
- [x] Database (PostgreSQL, TypeORM)
- [ ] Caching (Redis store)
- [ ] Sign in and sign up (JWT)
- [ ] Forget password
- [ ] Support multi-language i18n
- [x] Validation (request params, query..)
- [x] Docker installation
- [ ] CI/CD
- [x] Swagger for API document
- [x] Linter with Eslint for Typescript
- [x] Logger with `Morgan`
- [x] Debugger with `Winston`
