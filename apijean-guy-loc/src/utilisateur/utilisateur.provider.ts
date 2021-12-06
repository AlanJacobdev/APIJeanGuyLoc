
import { Connection } from 'typeorm';
import { Utilisateur } from './entities/utilisateur.entity';

export const UtilisateurProviders = [
  {
    provide: 'PHOTO_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Utilisateur),
    inject: ['DATABASE_CONNECTION'],
  },
];