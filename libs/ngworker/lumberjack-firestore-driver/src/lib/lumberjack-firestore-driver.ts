import { Inject, Injectable } from '@angular/core';

import { LumberjackLogDriver } from '@ngworker/lumberjack';

import {
  LumberjackFirestoreDriverConfig,
  lumberjackFirestoreDriverConfigToken,
} from './lumberjack-firestore-driver.config';

@Injectable()
export class LumberjackFirestoreDriver implements LumberjackLogDriver {
  constructor(@Inject(lumberjackFirestoreDriverConfigToken) public config: LumberjackFirestoreDriverConfig) {}

  logCritical(formattedLog: string): void {}

  logDebug(formattedLog: string): void {}

  logError(formattedLog: string): void {}

  logInfo(formattedLog: string): void {}

  logTrace(formattedLog: string): void {}

  logWarning(formattedLog: string): void {}
}
