import { ConnectionOptions } from 'typeorm';
 
 
export const config: ConnectionOptions = {
      // type: 'mysql',
      // host: 'obiwan2.univ-brest.fr',
      // port: 3306,
      // username: 'znedelero',
      // password: 'dkmnxvkr',
      // database: 'ztm2-znedelero',
      // entities: ["dist/**/*.entity{.ts,.js}"],
      // synchronize: true,

      type: 'mysql',
      host: 'baljabzxzgoht9w2e3id-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'ubuqadvmofppfyud',
      password: 'a8EnfTVHndOY6VHWTNeQ',
      database: 'baljabzxzgoht9w2e3id',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }
 
