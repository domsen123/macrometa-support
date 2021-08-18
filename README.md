# Vitessedge / Cloudflare / Macrometa

## Usage

### Build

To build the App, run

```bash
npm run build
```

And you will see the generated files in `dist`

### Deploy on Cloudflare Workers

1. Create your [Cloudflare](https://www.cloudflare.com/) account.
2. Install [Wrangler](https://developers.cloudflare.com/workers/cli-wrangler/install-update) CLI.
3. Copy `wrangler.example.toml` to `wrangler.toml`
4. Modify the `account_id` in [wrangler.toml](./worker-site/wrangler.toml).
5. Copy `functions/.env.example` to `functions/.env.production`
6. Modify the `VITEDGE_MACROMETA_ROOT_MAIL` and `VITEDGE_MACROMETA_ROOT_PWD` in `functions/.env`

```bash
npm run build
npm run preview # Simulate Worker environment locally
npm run deploy
```

or

```bash
npm run preview:watch
```

## vh.parse Error on Cloudflare Preview:

```bash
npm run preview:watch
```

Check [Auth Page](http://localhost:5000/auth) - enter some (valid) credentials and submit

## Working on SSR

```bash
npm run dev
```

Check [Auth Page](http://localhost:5000/auth) - enter some (valid) credentials and submit
