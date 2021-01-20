import { InjectionToken } from '@angular/core';

import { LumberjackFirestoreDriverInternalConfig } from './lumberjack-firestore-driver-internal.config';

export const lumberjackFirestoreDriverConfigToken: InjectionToken<LumberjackFirestoreDriverInternalConfig> = new InjectionToken(
  '__LUMBERJACK_FIRESTORE_DRIVER_CONFIG__'
);
