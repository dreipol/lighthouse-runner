# lighthouse-runner
[![CircleCI](https://circleci.com/gh/dreipol/lighthouse-runner/tree/master.svg?style=svg&circle-token=4738b5c5cde8e66a056114378acb9e3732146a35)](https://circleci.com/gh/dreipol/lighthouse-runner/tree/master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/cdc3bef46dee433c99d265156922bfad)](https://www.codacy.com/app/faebeee/lighthouse-runner?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=dreipol/lighthouse-runner&amp;utm_campaign=Badge_Grade)


Dreihouse is a tool to run automated lighthouse audits for a webproject. Dreihouse has the advantage
to be more configurable than lighthouse.


# Use Cases
There are several usecases for an automated audit tool like this. You can implement it into your CI so 
you'll never deploy a page with bad performances again. Or if you wan't to see if a site enhances over time.
You can also implement it in a gulp command.


# Install

    npm i @dreipol/lighthouse-runner

# Config


| field              | type          | default                                                        | value                                                                                                                           |
| ------------------ | ------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| paths              | Array<string> | `['/']`                                                        | Array of url paths. All these routes are tested and reported                                                                    |
| chromeFlags        | Array<string> | `['--window-size=1200,800']`                                   | Array of additional chrome flags. [See all](https://peter.sh/experiments/chromium-command-line-switches/)                       |
| folder             | string        | `./dreihouse-reports`                                         | Define location to store the reports                                                                                            |
| disableEmulation   | boolean       | `true`                                                         | Applay device emulation                                                                                                         |
| disableThrottling  | boolean       | `true`                                                         | Disable Network and CPU throttling                                                                                              |
| initialPageLoad    | boolean       | `true`                                                         | Define whether the page should be visited before the audits are run (Cache stuff)                                                                                             |
| preAuditScripts| Array<[PreAuditScriptInterface](./src/Interfaces/IPreAuditScript.ts)> |                             | Current available persisters are `html` `json` and `html-dashboard|
| report             | Array<string> | `['html']`                                                     | Different reporters. Thos will process the generated audit results. [`cli`, `html`, `json-dashboard`, `json`] |

### preAuditScripts
In order to handle login forms, or do other modifications of the page before lighthouse audits the page,
you can add some `preAuditScripts` in the config. Those scripts are executed right before lighthouse starts.
These scripts have to implement the [`PreAuditScriptInterface`](src/PreAuditScriptInterface.ts) interface.

Before execution of this script, the browser instance will already be on the inital url, passed in the `execute` method of `Dreihouse`

Here is an example of such login script
    
**ES6** 

```js
    module.exports = {
        execute:async(logger, page) {
            await page.waitForSelector('#username', { visible: true });
            await page.waitForSelector('#password', { visible: true });
            
            const usernameInput = await page.$('#username');
            const passwordInput = await page.$('#password');
            
            await usernameInput.type(process.env.LOGIN_USERNAME);
            await passwordInput.type(process.env.LOGIN_PASSWORD);
            
            await passwordInput.press('Enter');
        }
    }
```

**ES5**

```js
    module.exports = {
    execute: function(logger, page) {
        return page.waitForSelector('#id_password', { visible: true })
            .then(() => {
                return page.$('#id_password');
            })
            .then((passwordInput) => {
                return passwordInput.type(process.env.LOCKDOWN_PASSWORD)
                    .then(() => {
                        return passwordInput;
                    });
            })
            .then((passwordInput) => {
                return passwordInput.press('Enter');
            });
    },
};

```
    
Now in your `config` file you can load the login script


    ...
    saveReport: true,
    budget: {
        ...
    },
    preAuditScripts: [
        require('your/login/script.js'),
    ],
    reporters: {
        modules: [
            ...
            
            
### Example
    
```js
    paths: [
        '/',
    ],
    folder: './dreihouse-reports',
    tag: 'desktop',
    chromeFlags: ['--window-size=1280,1024', '--headless'],
    initialPageload: false,
    disableEmulation: true,
    disableThrottling: true,
    preAuditScripts: [
        loginScript,
    ],
    budget: {
        dreipol: 0.9,
        seo: 0.9,
        performance: 0.9,
        pwa: 0.9,
        accessibility: 0.9,
        'best-practices': 0.9,
    },
```
    
# Programmatic use
In order to modify `dreihouse` to your needs, you can orchestrate `dreihouse` programmatically.

In this example script we run the audit every 15s and use the `cli` to report the results but only start the chrome once
and reuse the connection.

```js
    import Dreihouse from "@dreipol/lighthouse-runner/dist/Dreihouse";
    
    const dreihouse = new Dreihouse(CONFIG, ['cli']);
    
    async function run() {
        await dreihouse.startChrome(INITIAL_URL);
        await execute();
    }
    
    async function execute() {
        await dreihouse.audit(URL);
        setTimeout(async () => {
            await execute();
        }, 15000);
    }
    
    
    run();
```
    
# Tools
- [@dreipol/dreihouse-cli](https://www.npmjs.com/package/@dreipol/dreihouse-cli) helps you to run
your audit from the CLI without the need of a project or config file
