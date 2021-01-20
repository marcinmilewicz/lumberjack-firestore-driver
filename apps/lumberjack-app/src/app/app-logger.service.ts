import { Injectable } from '@angular/core';

import { LumberjackService, LumberjackTimeService, ScopedLumberjackLogger } from '@ngworker/lumberjack';

@Injectable({
  providedIn: 'root',
})
export class AppLogger extends ScopedLumberjackLogger {
  public scope = 'Forest App';

  constructor(lumberjack: LumberjackService, time: LumberjackTimeService) {
    super(lumberjack, time);
  }

  forestOnFire = this.createCriticalLogger('The forest is on fire').build();

  helloForest = this.createInfoLogger('HelloForest').build();
}
