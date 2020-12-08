import { Inject, Injectable, NgZone } from '@angular/core';

// tslint:disable-next-line: ordered-imports
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { LumberjackLevel, LumberjackLogDriver, LumberjackLogLevel } from '@ngworker/lumberjack';

import {
  LumberjackFirestoreDriverConfig,
  lumberjackFirestoreDriverConfigToken,
} from './lumberjack-firestore-driver.config';

interface FirestoreCollectionItem {
  entry: string;
  level: LumberjackLogLevel;
  origin: string;
  timestamp: number;
}

@Injectable()
export class LumberjackFirestoreDriver implements LumberjackLogDriver {
  constructor(
    @Inject(lumberjackFirestoreDriverConfigToken) public config: LumberjackFirestoreDriverConfig,
    private firestore: AngularFirestore,
    private ngZone: NgZone
  ) {}

  logCritical(formattedLog: string): void {
    this.log(formattedLog, LumberjackLevel.Critical);
  }

  logDebug(formattedLog: string): void {
    this.log(formattedLog, LumberjackLevel.Debug);
  }

  logError(formattedLog: string): void {
    this.log(formattedLog, LumberjackLevel.Error);
  }

  logInfo(formattedLog: string): void {
    this.log(formattedLog, LumberjackLevel.Info);
  }

  logTrace(formattedLog: string): void {
    this.log(formattedLog, LumberjackLevel.Trace);
  }

  logWarning(formattedLog: string): void {
    this.log(formattedLog, LumberjackLevel.Warning);
  }

  private log(entry: string, level: LumberjackLogLevel): void {
    const { origin } = this.config;
    const timestamp = Date.now();
    this.sendLogPackage({ entry, level, origin, timestamp })
      .then((d) => console.log(d))
      .catch((error) => console.error('Package has not been successfully sent.', { error }));
  }

  private sendLogPackage(collectionItem: FirestoreCollectionItem) {
    return new Promise<DocumentReference<FirestoreCollectionItem>>((resolve) => {
      this.ngZone.runOutsideAngular(() => {
        const promise = this.firestore
          .collection<FirestoreCollectionItem>(this.config.collectionName)
          .add(collectionItem);

        resolve(promise);
      });
    });
  }
}
