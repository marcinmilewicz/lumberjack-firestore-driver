// tslint:disable-next-line: ordered-imports
import { FirebaseOptions } from '@angular/fire';

import { LumberjackLogDriverConfig } from '@ngworker/lumberjack';

export interface LumberjackFirestoreDriverInternalConfig extends LumberjackLogDriverConfig {
  /**
   *
   * The identifier of the app who emitted the log.
   * This is used to organize logs on the log store.
   *
   */
  origin: string;

  /**
   *
   * The name of collection in Firestore for logs storing
   */
  collectionName: string;

  /**
   *
   * The configuration of Firebase application instance
   */
  firebaseConfig: FirebaseOptions;
}
