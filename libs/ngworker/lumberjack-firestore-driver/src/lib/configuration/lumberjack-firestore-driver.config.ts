import { LumberjackFirestoreDriverInternalConfig } from './lumberjack-firestore-driver-internal.config';

export type LumberjackFirestoreDriverConfig = Omit<LumberjackFirestoreDriverInternalConfig, 'identifier'> &
  Partial<Pick<LumberjackFirestoreDriverInternalConfig, 'identifier'>>;
