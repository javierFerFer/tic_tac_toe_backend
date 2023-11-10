import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { FirebaseRepository } from '../firebase/firebase.service';

import * as tic_tac_toe_properties from '../../../.tic-tac-toe-properties.json';

const firebaseProvider = {
  provide: 'FIREBASE_APP',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const firebaseConfig: admin.ServiceAccount = {
      projectId: tic_tac_toe_properties.project_id,
      clientEmail: tic_tac_toe_properties.client_email,
      privateKey: tic_tac_toe_properties.private_key,
    };

    return admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
      storageBucket: `${firebaseConfig.projectId}.appspot.com`,
    });
  },
};

@Module({
  imports: [ConfigModule],
  providers: [firebaseProvider, FirebaseRepository],
  exports: [FirebaseRepository],
})
export class FirebaseModule {}
