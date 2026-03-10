# countup

## Develop locally

`@eeacms/countup` is a React library. Its local development workflow uses the
bundled example app instead of a Volto or Plone docker stack.

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/eea/countup.git
   cd countup
   make install
   ```

1. Start the example app:

   ```bash
   make start
   ```

1. Open http://localhost:8888

1. Initialize git hooks if needed:

   ```bash
   yarn prepare
   ```

If port `8888` is already in use, start the example app on a different port:

```bash
SERVE_PORT=8899 make start
```

## Use in Volto 17 or Volto 18 during development

`@eeacms/countup` is not a Volto addon. Add it as a dependency, not in the
Volto `addons` list.

1. Add a development checkout in `mrs.developer.json`:

   ```json
   {
     "countup": {
       "develop": true,
       "url": "https://github.com/eea/countup.git",
       "package": "@eeacms/countup",
       "branch": "develop",
       "path": "src"
     }
   }
   ```

1. Add `@eeacms/countup` to your project dependencies.

1. Refresh the project setup:

   ```bash
   make install
   ```

1. Start the project frontend as usual.

For Cookieplone-based Volto 18 projects:

```bash
make frontend-start
```

For legacy Volto 17 projects, keep using the existing yarn-based frontend
workflow for that project.

## Tests

Run the library test suite directly:

```bash
make test
```
