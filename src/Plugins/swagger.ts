import * as Hapi from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import * as HapiSwagger from 'hapi-swagger';
import { version } from 'os';
import Pack from '../../package.json'


const swaggerOptions: HapiSwagger.RegisterOptions = {
  info: {
      title: 'Cab Booking Api Documentation',
      version : Pack.version,
      contact : {
        name : 'ABHISHEK DHADWAL',
        email : 'abhishekdhadwal33@gmail.com'
      }
  },
  'schemes': [ 'http', 'https' ]
};

const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
  {
      plugin: Inert
  },
  {
      plugin: Vision
  },
  {
      plugin: HapiSwagger,
      options: swaggerOptions
  }
];




export default plugins


