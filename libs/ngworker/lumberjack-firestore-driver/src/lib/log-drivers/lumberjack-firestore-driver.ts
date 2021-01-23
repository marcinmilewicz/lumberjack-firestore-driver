import { Inject, Injectable, NgZone } from '@angular/core';

// tslint:disable-next-line: ordered-imports
import { AngularFirestore } from '@angular/fire/firestore';
import { LumberjackLevel, LumberjackLogDriver, LumberjackLogDriverLog, LumberjackLogLevel } from '@ngworker/lumberjack';
import { lumberjackFirestoreDriverConfigToken } from '../configuration/lumberjack-firestore-driver-config.token';

import { LumberjackFirestoreDriverInternalConfig } from '../configuration/lumberjack-firestore-driver-internal.config';

interface FirestoreCollectionItem {
  entry: string;
  level: LumberjackLogLevel;
  origin: string;
  timestamp: number;
}

@Injectable()
export class LumberjackFirestoreDriver implements LumberjackLogDriver {
  static driverIdentifier = 'LumberjackFirestoreDriver';

  constructor(
    @Inject(lumberjackFirestoreDriverConfigToken) public config: LumberjackFirestoreDriverInternalConfig,
    private firestore: AngularFirestore,
    private ngZone: NgZone
  ) {}

  logCritical({ formattedLog }: LumberjackLogDriverLog): void {
    this.log(formattedLog, LumberjackLevel.Critical);
  }

  logDebug({ formattedLog }: LumberjackLogDriverLog): void {
    this.log(formattedLog, LumberjackLevel.Debug);
  }

  logError({ formattedLog }: LumberjackLogDriverLog): void {
    this.log(formattedLog, LumberjackLevel.Error);
  }

  logInfo({ formattedLog }: LumberjackLogDriverLog): void {
    this.log(formattedLog, LumberjackLevel.Info);
  }

  logTrace({ formattedLog }: LumberjackLogDriverLog): void {
    this.log(formattedLog, LumberjackLevel.Trace);
  }

  logWarning({ formattedLog }: LumberjackLogDriverLog): void {
    this.log(formattedLog, LumberjackLevel.Warning);
  }

  private log(entry: string, level: LumberjackLogLevel): void {
    const { origin } = this.config;
    const timestamp = Date.now();
    this.sendLogPackage({ entry, level, origin, timestamp });
  }

  private sendLogPackage(collectionItem: FirestoreCollectionItem) {
    this.ngZone.runOutsideAngular(() => {
      this.firestore
        .collection<FirestoreCollectionItem>(this.config.collectionName)
        .add(collectionItem)
        .catch((error) => console.error('Package has not been successfully sent.', { error }));
    });
  }
}
