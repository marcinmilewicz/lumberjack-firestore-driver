import { Inject, NgModule, Optional, SkipSelf } from '@angular/core';

import {
  LumberjackLogDriverConfig,
  lumberjackLogDriverConfigToken,
  lumberjackLogDriverToken,
} from '@ngworker/lumberjack';

import { LumberjackFirestoreDriver } from './lumberjack-firestore-driver';
import {
  LumberjackFirestoreDriverConfig,
  lumberjackFirestoreDriverConfigToken,
} from './lumberjack-firestore-driver.config';

export function lumberjackFirestoreDriverFactory(
  logDriverConfig: LumberjackLogDriverConfig,
  lumberjackFirestoreDriverConfig: LumberjackFirestoreDriverConfig
): LumberjackFirestoreDriver {
  const config: LumberjackFirestoreDriverConfig = {
    ...logDriverConfig,
    ...lumberjackFirestoreDriverConfig,
  };

  return new LumberjackFirestoreDriver(config);
}

@NgModule({
  providers: [
    {
      deps: [lumberjackLogDriverConfigToken, lumberjackFirestoreDriverConfigToken],
      multi: true,
      provide: lumberjackLogDriverToken,
      useFactory: lumberjackFirestoreDriverFactory,
    },
  ],
})
export class LumberjackFirestoreDriverRootModule {
  constructor(
    // tslint:disable: no-any no-null-keyword
    @Optional()
    @SkipSelf()
    @Inject(LumberjackFirestoreDriverRootModule)
    maybeNgModuleFromParentInjector: LumberjackFirestoreDriverRootModule = null as any
    // tslint:enable: no-any no-null-keyword
  ) {
    if (maybeNgModuleFromParentInjector) {
      throw new Error(
        'LumberjackFirestoreDriverModule.forRoot registered in multiple injectors. Only call it from your root injector such as in AppModule.'
      );
    }
  }
}
