# dreihouse
Create lighthouse report for a website

[![CircleCI](https://circleci.com/gh/dreipol/lighthouse-runner/tree/master.svg?style=svg&circle-token=4738b5c5cde8e66a056114378acb9e3732146a35)](https://circleci.com/gh/dreipol/lighthouse-runner/tree/master)

## Requirements
You need `@dreipol/lighthouse-config` installed locally in the project

## Install

    npm i @dreipol/lighthouse-runner -g

and install `@dreipol/lighthouse-config` and `@dreipol/lighthouse-audits` as peer dependencies

## Setup
After you installed the you have the `dreihouse` command available within your CLI. Now to create a initial default configuration there is a setup command.
First you have to navigate into the root of your project.
Then run

    dreihouse setup path/to/configfolder

The `--setup` flag tells `dreihouse` to create an inital setup. It copies some default config files from the `@dreipol/lighthouse-config` module.

## Usage

    $ dreihouse report path/to/config/desktop.js {--port 8521} {--quiet}

### Arguments
| option     | optional | description                                                                  |
| ---------- | -------- | ---------------------------------------------------------------------------- |
| `--port`   | `true`   | Define the chrome debugging port. If null, a new chrome instance is launched |

### Commands
| option   | description                                                     |
| -------- | --------------------------------------------------------------- |
| `setup <dir>`  | Create inital setup by copying cpnfig files into a given folder |
| `report <configFile>` | Run report with given config file                               |

## Report site with lockdown
To run the report against a site thats behind a lockdown there is a simple trick
you can do to get around the lockdown page to report the actual site.
Therefore we start a new chrome with an open debug port. In that instance we can login.
When we pass the port number of that chrome to our reporter, lighthouse will be able to reuse
the sessions & cookies created previously and we can pass the lockdown page.

- run `chrome-debug` in your console. This creates a new chrome instance with an open debugport
- Login in the website/enter the password for the lockdown page
- run your report command with that portnumber as a parameter

    `dreihouse report path/to/config.js --port 56723`

# Setup Circle CI
## npm command
In order to autromate the circle ci report we have to create a npm run command

    "scripts": {
        "report": "./node_modules/.bin/dreihouse report ./lighthouse/lh.prod.desktop.js --silent"
    }

## sezup circle onfig yml
Then we have to add some steps or a workflow to run the command and persist the artifacts

    version: 2

    general:
    artifacts:
        - "~/repo/reports"

    jobs:
    report:
        docker:
        # specify the version you desire here
        - image: circleci/node:8.9-browsers
        working_directory: ~/repo
        steps:
        - checkout
        - restore_cache:
            keys:
            - v1-dependencies-{{ checksum "package.json" }}
            # fallback to using the latest cache if no exact match is found
            - v1-dependencies-

        - run: npm install
        - run: npm run report
        - store_artifacts:
            path: ~/repo/reports
            destination: lighthouse



    workflows:
    version: 2
    build_and_report:
        jobs:
        - report

Note: You need a dockerimage that includes some Browsere: `circleci/node:8.9-browsers`.
Otherwise install and set `CHROME_PATH` manually
