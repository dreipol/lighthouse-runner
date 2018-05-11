# dreihouse
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
The configuration is stored in an external module.Check out [@dreipol/lighthouse-config](https://www.npmjs.com/package/@dreipol/lighthouse-config)
### reporters
Reporters are a set of scripts that will handle the results of the lighthouse audit. Those can be used to handle 
data differently like create an HTML file or a JSON file from the results. You can add your own script to upload 
the result data to your webservice. Therefore you can simply add an object that implements the 
[`ResultReporterInterface`](src/ResultReporter/ResultReporterInterface.ts) Interface.

**NOTE**
look under `Usage` to see what reporters are available

**Example**

    ...
    reporters: {
        modules: [
            'cli',
            'json',
           {
                key: "MyWebserviceReporter",
                handle: async (url, results) => {
                    await request.post('http://my.webservice', results);
                }
           }

### preAuditScripts
In order to handle login forms, or do other modifications of the page before lighthouse audits the page,
you can add some `preAuditScripts` in the config. Those scripts are executed right before lighthouse starts.
These scripts have to implement the [`PreAuditScript`](src/PreAuditScript/PreAuditScript.ts) interface.

The will be already on your desired route

Here is an example of such login script
    
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

# Usage
## Commands
    `dreihouse report ./config/desktop.js -r cli`
    
### `setup <dir>`
The setup command will setup the default configuration files in the folder specified in the command.
After setup you have to edit the config to your flavours.

### `report <file> --reporter [REPORTER]`
To create a report you have to call this command followed by the config file that holds the configuration
for `dreihouse`. By adding the `--port` flag, you can reuse a already started chrome instance instead of
creating a new one. This gives you the ability to login on a site before running the reports since the session
is shared when lighthouse attaches to that port.

**list of available reporters**
- `cli` Print lighthouse results in CLI
- `json` Store the whole LH report as JSON
- `json-dashboard` save just `lighthouse-dashboard` specific data
- `html` save the LH report for further inspections



#### Flags
| name             | optional | default  | example                       | description                                         |
| ---------------- | -------- | -------- | ----------------------------- | --------------------------------------------------- |
| `-r, --reporter` | `false`  |          | cli,html,json,json-dashboard | Add list of repprters to handle the data. Available |
| `-p, --port`         | `true`   |   9222   |                               | Debugging port of a running chrome instance         |
| `-v, --verbose`         | `true`   | false     |                               | Verbose console output   |


## Circle CI Config

Example config file: 

    version: 2
    jobs:
      build:
        docker:
          - image: circleci/node:8.9-browsers
        working_directory: ~/repo
        steps:
          
          - checkout
          
          - restore_cache:
              keys:
              - v1-npm-dependencies-{{ checksum "package.json" }}
          
          - run:
              name: install
              command: |
                npm i
          
          - run:
              name: install dreihouse
              command: |
                npm i @dreipol/lighthouse-audits
                npm i @dreipol/lighthouse-config
                npm i @dreipol/lighthouse-runner
          
          - save_cache:
              paths:
                -  ~/repo/node_modules
              key: v1-npm-dependencies-{{ checksum "package.json" }}
          
          - run:
              name: run report
              command: |
                ./node_modules/.bin/dreihouse report ./lighthouse/lh.prod.desktop.js -r cli,html
                ./node_modules/.bin/dreihouse report ./lighthouse/lh.prod.mobile.js -r cli
          
          - store_artifacts:
              path: ~/repo/reports
              destination: lighthouse
