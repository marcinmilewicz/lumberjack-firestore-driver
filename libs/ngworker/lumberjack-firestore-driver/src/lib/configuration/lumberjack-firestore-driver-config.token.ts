import { InjectionToken } from '@angular/core';

import { LumberjackFirestoreDriverConfig } from './lumberjack-firestore-driver.config';

export const lumberjackFirestoreDriverConfigToken: InjectionToken<LumberjackFirestoreDriverConfig> = new InjectionToken(
  '__LUMBERJACK_FIRESTORE_DRIVER_CONFIG__'
);
