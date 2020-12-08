import { InjectionToken } from '@angular/core';

import { LumberjackLogDriverConfig } from '@ngworker/lumberjack';

export const lumberjackFirestoreDriverConfigToken: InjectionToken<LumberjackFirestoreDriverConfig> = new InjectionToken(
  '__LUMBERJACK_FIRESTORE_DRIVER_CONFIG__'
);

// tslint:disable-next-line: no-empty-interface
export interface LumberjackFirestoreDriverConfig extends LumberjackLogDriverConfig {
  someNeededOption: string;
}
