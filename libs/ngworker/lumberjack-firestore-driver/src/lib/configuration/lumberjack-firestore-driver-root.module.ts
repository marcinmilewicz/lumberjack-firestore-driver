import { Inject, NgModule, NgZone, Optional, SkipSelf } from '@angular/core';

// tslint:disable-next-line: ordered-imports
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import {
  LumberjackLogDriverConfig,
  lumberjackLogDriverConfigToken,
  lumberjackLogDriverToken,
} from '@ngworker/lumberjack';

import { LumberjackFirestoreDriver } from '../log-drivers/lumberjack-firestore-driver';
import { lumberjackFirestoreDriverConfigToken } from './lumberjack-firestore-driver-config.token';
import { LumberjackFirestoreDriverConfig } from './lumberjack-firestore-driver.config';

export function lumberjackFirestoreDriverFactory(
  firestore: AngularFirestore,
  logDriverConfig: LumberjackLogDriverConfig,
  lumberjackFirestoreDriverConfig: LumberjackFirestoreDriverConfig,
  ngZone: NgZone
): LumberjackFirestoreDriver {
  const config: LumberjackFirestoreDriverConfig = {
    ...logDriverConfig,
    ...lumberjackFirestoreDriverConfig,
  };

  return new LumberjackFirestoreDriver(config, firestore, ngZone);
}

@NgModule({
  imports: [AngularFirestoreModule],
  providers: [
    {
      deps: [AngularFirestore, lumberjackLogDriverConfigToken, lumberjackFirestoreDriverConfigToken, NgZone],
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
