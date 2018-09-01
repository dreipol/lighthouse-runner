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

# Requirements
- `@dreipol/lighthouse-config` Holds some default configuration. Of course you don't have to install this and you can write your
own config file instead of extending this one.
- `@dreipol/lighthouse-audits` Some additional audits that we developed and found useful

# Config
The configuration is stored in an external module.
Check out [@dreipol/lighthouse-config](https://www.npmjs.com/package/@dreipol/lighthouse-config)

See [./example](./example) for an easy to use example.

In this example we have two config files. One for the `mobile` environment and one for the `desktop` environment.
The file `lh.base.js` exports a function, that will alter some config that is equal through all four files.
If you look into those files, you'll see that the `mobile` version extends the `desktop` config. 
The only modifications are that the viewport is resized and throttling is enabled on mobile devices.

The `desktop` config extend from the basic configuration that comes with the
[`@dreipol/lighthouse-config`](https://www.npmjs.com/package/@dreipol/lighthouse-config) module. Checkout the [basic 
dektop config](https://github.com/dreipol/lighthouse-config/blob/master/config/base/desktop.js)

# Programmatic use
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
    
# Tools
- [@dreipol/dreihouse-cli](https://www.npmjs.com/package/@dreipol/dreihouse-cli) helps you to run
your audit from the CLI without the need of a project or config gile
