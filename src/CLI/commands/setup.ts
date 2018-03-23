import { CommandModule } from 'yargs';
import writeDefaultConfig from '../writeDefaultConfig.js';

export default <CommandModule>({
    command: 'setup',

    describe: 'Create inital configsetup',

    builder: {
        config: {
            required: true,
            description: 'Folder to store config'
        }
    },

    handler(argv) {
        writeDefaultConfig(<string>argv.config);
    }
});