import { LumberjackLogDriverConfig } from '@ngworker/lumberjack';

import { LumberjackFirestoreDriverConfig } from './lumberjack-firestore-driver.config';

export type LumberjackFirestoreDriverOptions = Omit<LumberjackFirestoreDriverConfig, keyof LumberjackLogDriverConfig>;
