## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)

## Opstarten

### Create a .env file which include:

```typescript
VITE_API_URL = "http://localhost:9000/api";
```

### Install all dependencies using the following command:

```typescript
yarn install
```

### Run the following command to start the application with the following command:

```typescript
yarn dev
```

## Testen

### To run the tests be sure that the application is running locally in the terminal in Front-End and the Back-End:

```
Front-End: yarn dev
Back-End: yarn start
```

### Then open a different terminal and run the following command to start the tests:

```typescript
yarn test
```

You can know select E2E testing in the cypress window, choice which webbrowser you prefer and select then the tests you want to run
