# `backend`

The open source Zapier alternative. Build workflow automation without spending time and money.

## Testing

Copy the example environment file and adjust it before running the test suite:

```bash
cp .env-example.test .env.test
```

The `.env.test` file defines the variables used by the tests:

- `APP_ENV` – should be `test`.
- `HOST` – backend host name.
- `PROTOCOL` – `http` or `https` protocol.
- `PORT` – port used by the HTTP server.
- `LOG_LEVEL` – log verbosity level.
- `ENCRYPTION_KEY` – encryption key for credentials.
- `WEBHOOK_SECRET_KEY` – secret key for webhook verification.
- `APP_SECRET_KEY` – application secret for authentication.
- `POSTGRES_HOST` – PostgreSQL host.
- `POSTGRES_DATABASE` – name of the test database.
- `POSTGRES_PORT` – PostgreSQL port.
- `POSTGRES_USERNAME` – PostgreSQL user.
- `POSTGRES_PASSWORD` – PostgreSQL password.
- `REDIS_HOST` – Redis host.
- `AUTOMATISCH_CLOUD` – set to `true` when running inside Automatisch Cloud.
