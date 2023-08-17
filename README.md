# Testing Backend
- [CodeCov Report](https://app.codecov.io/gh/jackey8616/testing-backend)
- default port: 8085


## Installation
```sh
$ yarn install
```

## Testing (Unit + Integration)
```sh
$ yarn test --coverage
```

## Running
```sh
$ yarn run
```

## Folder
- coverage (reports of coverage)
- restful-client-config
    (ThunderClient & Postman testing config, can import into ThunderClient or Postman to invoke API)
- src (source folder)
    - service
        - currency.service.ts (defines logic for Currency)
        - currency.spec.ts (unit test cases for CurrencyService)
    - server.ts (actual express server's code)
    - server.e2e-spec.ts (integration test cases for Server)
