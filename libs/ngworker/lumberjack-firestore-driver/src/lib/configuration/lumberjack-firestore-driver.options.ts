import { LumberjackLogDriverConfig } from '@ngworker/lumberjack';

import { LumberjackFirestoreDriverInternalConfig } from './lumberjack-firestore-driver-internal.config';

export type LumberjackFirestoreDriverOptions = Omit<
  LumberjackFirestoreDriverInternalConfig,
  keyof LumberjackLogDriverConfig
> &
  Partial<LumberjackLogDriverConfig>;
