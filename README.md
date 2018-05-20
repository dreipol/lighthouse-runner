# lighthouse-runner
[![CircleCI](https://circleci.com/gh/dreipol/lighthouse-runner/tree/master.svg?style=svg&circle-token=4738b5c5cde8e66a056114378acb9e3732146a35)](https://circleci.com/gh/dreipol/lighthouse-runner/tree/master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/cdc3bef46dee433c99d265156922bfad)](https://www.codacy.com/app/faebeee/lighthouse-runner?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=dreipol/lighthouse-runner&amp;utm_campaign=Badge_Grade)

Dreihouse is a tool to run automated lighthouse audits for a webproject. Dreihouse has the advantage
to be more configurable than lighthouse.

# Install

    npm i @dreipol/lighthouse-runner

## Requirements
You need `@dreipol/lighthouse-config` and `@dreipol/lighthouse-audits` installed locally in the project.


# Setup
After installing the module you have the command `dreihouse` available in your CLI.
To setup some initial configuration you run the `setup` command(See below).
If you want the full advantage of `dreihouse` you could set it up for your CI.

## Config
The configuration is stored in an external module.
Check out [@dreipol/lighthouse-config](https://www.npmjs.com/package/@dreipol/lighthouse-config)

See [./example](./example) for an easy to use example.

In this example we have two config files. One for the `mobile` environment and one for the `desktop` environment.
The file `lh.base.js` exports a function, that will alter some config that is equal through all four files.
If you look into those files, you'll see that the `mobile` version extends the `desktop` config. 
The only modifications are that the viewport is resized and throttling is enabled on mobile devices.

The `desktop` config extend from the basic configuration that comes with the
[`@dreipol/lighthouse-config`](https://www.npmjs.com/package/@dreipol/lighthouse-config) module. Checkout the 
[basic dektop config](https://github.com/dreipol/lighthouse-config/blob/master/config/base/desktop.js)

# Usage
## Programmatic use
In order to modify `dreihouse` to your needs, you can orchestrate `dreihouse` programmatically.

In this example script we run the audit every 15s and use the `cli` to report the results but only start the chrome once
and reuse the connection.

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


    

## Commands
In order to use `dreihouse` with the CLI install [@dreipol/dreihouse-cli](https://www.npmjs.com/package/@dreipol/dreihouse-cli) 
