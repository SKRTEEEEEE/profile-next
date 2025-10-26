# Terminar migración a Nextjs16
## Objetivo
Terminar de migrar mi aplicación de nextjs15.5 a nextjs16
- Actualmente he ejecutado el comando `npx @next/codemod@canary upgrade latest
`

## Errores/estado actual
```bash
$ npx @next/codemod@canary upgrade latest
Need to install the following packages:
@next/codemod@16.0.1-canary.2
Ok to proceed? (y)

  Detected installed versions:
  - React: v19.1.0
  - Next.js: v15.5.4
√ The following codemods are recommended for your upgrade. Select the ones to apply. » (v16.0.0-canary.11) remove-experimental-ppr, (v16.0.0-canary.10) remove-unstable-prefix, (v15.6.0-canary.54) middleware-to-proxy
Upgrading your project to Next.js 16.0.0...
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: profile-next@0.0.1
npm warn Found: next@15.5.4
npm warn node_modules/next
npm warn   next@"16.0.0" from the root project
npm warn   1 more (next-intl)
npm warn
npm warn Could not resolve dependency:
npm warn peer next@"^12.0.0 || ^13.0.0 || ^14.0.0 || ^15.0.0" from next-intl@4.3.9
npm warn node_modules/next-intl
npm warn   next-intl@"^4.3.9" from the root project

added 5 packages, removed 1 package, changed 21 packages, and audited 1002 packages in 33s

288 packages are looking for funding
  run `npm fund` for details

4 low severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
WARNING: Git directory is not clean. Forcibly continuing.
Executing command: jscodeshift --parser=tsx --ignore-pattern=**/node_modules/** --ignore-pattern=**/.next/** --extensions=tsx,ts,jsx,js --transform C:\Users\Laptop\AppData\Local\npm-cache\_npx\6a090669e21b4303\node_modules\@next\codemod\transforms\remove-experimental-ppr.js C:\Users\Laptop\Code\profile-migration\profile-next
Processing 105 files...
Spawning 11 workers...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 5 files to free worker...
All done.
Results:
0 errors
105 unmodified
0 skipped
0 ok
Time elapsed: 3.932seconds
WARNING: Git directory is not clean. Forcibly continuing.
Executing command: jscodeshift --parser=tsx --ignore-pattern=**/node_modules/** --ignore-pattern=**/.next/** --extensions=tsx,ts,jsx,js --transform C:\Users\Laptop\AppData\Local\npm-cache\_npx\6a090669e21b4303\node_modules\@next\codemod\transforms\remove-unstable-prefix.js C:\Users\Laptop\Code\profile-migration\profile-next
Processing 105 files...
Spawning 11 workers...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 5 files to free worker...
All done.
Results:
0 errors
105 unmodified
0 skipped
0 ok
Time elapsed: 3.634seconds
WARNING: Git directory is not clean. Forcibly continuing.
Executing command: jscodeshift --parser=tsx --ignore-pattern=**/node_modules/** --ignore-pattern=**/.next/** --extensions=tsx,ts,jsx,js --transform C:\Users\Laptop\AppData\Local\npm-cache\_npx\6a090669e21b4303\node_modules\@next\codemod\transforms\middleware-to-proxy.js C:\Users\Laptop\Code\profile-migration\profile-next
Processing 105 files...
Spawning 11 workers...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 10 files to free worker...
Sending 5 files to free worker...
All done.
Results:
0 errors
104 unmodified
1 skipped
0 ok
Time elapsed: 3.557seconds

✔ Codemods have been applied successfully.
⚠ Found 1 dependency that seem incompatible with the upgraded package versions.
You may have to update these packages to their latest version or file an issue to ask for support of the upgraded libraries.
next-intl 4.3.9
  └── ✕ unmet peer next@"^12.0.0 || ^13.0.0 || ^14.0.0 || ^15.0.0": found 16.0.0


Laptop@DESKTOP-98ULTRB MINGW64 ~/code/profile-migration/profile-next (buildn)
$ npm run dev

> profile-next@0.0.1 dev
> next dev --turbopack

 ⚠ Port 3000 is in use by process 27700, using available port 3002 instead.
 ⚠ `eslint` configuration in next.config.ts is no longer supported. See more info here: https://nextjs.org/docs/app/api-reference/cli/next#next-lint-options
 ⚠ Invalid next.config.ts options detected:
 ⚠     Unrecognized key(s) in object: 'eslint'
 ⚠ See more info here: https://nextjs.org/docs/messages/invalid-next-config
   ▲ Next.js 16.0.0 (Turbopack)
   - Local:        http://localhost:3002
   - Network:      http://100.85.85.67:3002
   - Experiments (use with caution):
     · optimizePackageImports

 ✓ Starting...

   We detected TypeScript in your project and reconfigured your tsconfig.json file for you.
   The following suggested values were added to your tsconfig.json. These values can be changed to fit your project's needs:

        - include was updated to add '.next\dev/types/**/*.ts'
        - include was updated to add '.next\dev/types/**/*.ts'

   The following mandatory changes were made to your tsconfig.json:

        - jsx was set to react-jsx (next.js uses the React automatic runtime)

 ✓ Ready in 1839ms
 ⨯ ReferenceError: middleware is not defined
    at module evaluation (src\proxy.ts:7:16)
    at Object.<anonymous> (C:\Users\Laptop\Code\profile-migration\profile-next\.next\dev\server\middleware.js:5:3)
   5 | const proxy = createMiddleware(routing);
   6 |
>  7 | export default middleware;
     |                ^
   8 |
   9 | export const config = {
  10 |   // Match all pathnames except for
 GET / 404 in 1809ms (compile: -181117µs, proxy.ts: 1792ms, render: 198ms)

```
## Key points
- [ ] Terminar los cambios necesarios para pasar que funcione mi pagina utilizando nextjs16
  

