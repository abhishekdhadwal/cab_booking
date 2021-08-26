import * as Hapi from '@hapi/hapi';
import {swaggger_plugin, plugin_auth} from './src/Plugins/index';
import connect_to_db from './db';
import bootstrap_data from './bootstrap';
import { config } from 'dotenv';
config();
import Routes from './src/Routes/router';


const init = async () => {

      const server = await new Hapi.Server({
            port : process.env.SERVER_PORT_DEV,
            routes: { cors: true }
        });

      server.route({
            method: 'GET',
            path: '/',
            options : {
                  auth : false,
                  handler: (request, h) => {
                        return 'Hello World!';
                  }
            }
      });

      await server.register(swaggger_plugin); 
      await server.register(plugin_auth); 
      await server.route(Routes);
      await server.start();
      console.log(`Server running on ${server.info.uri}/documentation`);
      await connect_to_db();
      await bootstrap_data();

};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();

