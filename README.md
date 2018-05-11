# dreihouse
[![CircleCI](https://circleci.com/gh/dreipol/lighthouse-runner/tree/master.svg?style=svg&circle-token=4738b5c5cde8e66a056114378acb9e3732146a35)](https://circleci.com/gh/dreipol/lighthouse-runner/tree/master)

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

# Usage
## Commands
List all available commands

### `setup <dir>`
The setup command will setup the default configuration files in the folder specified in the command.
After setup you have to edit the config to your flavours.

### `report <file>`
To create a report you have to call this command followed by the config file that holds the configuration
for `dreihouse`. By adding the `--port` flag, you can reuse a already started chrome instance instead of
creating a new one. This gives you the ability to login on a site before running the reports since the session
is shared when lighthouse attaches to that port.

#### Flags
| name       | optional | default  | description       |
| ---------- | -------- | -------- | ----------------- |
| `--port`   | `true`   | 3000     | Debugging port of a running chrome instance|


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
                ./node_modules/.bin/dreihouse report ./lighthouse/lh.prod.desktop.js
                ./node_modules/.bin/dreihouse report ./lighthouse/lh.prod.mobile.js    
          
          - store_artifacts:
              path: ~/repo/reports
              destination: lighthouse
