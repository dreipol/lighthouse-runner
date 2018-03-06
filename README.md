# dreipol-reporter
Create lighthouse report for a website

## Install

    npm i @dreipol/dreipol-lighthouse -g

## Usage

    $ dreihouse --config=path/to/config/desktop.js {--reports=./reports} {--port=8521}

### Options
| option| optional | description |
| --- | --- | --- |
| `--config` | `false` | Run report with this config file. Checkout `@dreipol/lighthouse-config` |
| `--reports` | `true` | Define where to store the saved reports. Relative from where you run your command |
| `--port` | `true` | Define the chrome debugging port. If null, a new chrome instance is launched |



## Report site with lockdown
To run the report against a site thats behind a lockdown there is a simple trick 
you can do to get around the lockdown page to report the actual site.
Therefore we start a new chrome with an open debug port. In that instance we can login.
When we pass the port number of that chrome to our reporter, lighthouse will be able to reuse
the sessions & cookies created previously and we can pass the lockdown page.

- run `chrome-debug` in your console. This creates a new chrome instance with an open debugport
- Login in the website/enter the password for the lockdown page
- run your report command with that portnumber as a parameter
    
    `dreihouse --config=path/to/config.js --port=56723`
