import { TestBed } from '@angular/core/testing';

import { LumberjackLevel, LumberjackLogLevel, LumberjackTimeService } from '@ngworker/lumberjack';

const createLog = (level: LumberjackLogLevel, message = '', scope = 'Test') => ({
  scope,
  createdAt: TestBed.inject(LumberjackTimeService).getUnixEpochTicks(),
  level,
  message,
});
export const createCriticalLog = (message?: string, scope?: string) =>
  createLog(LumberjackLevel.Critical, message, scope);
export const createDebugLog = (message?: string, scope?: string) => createLog(LumberjackLevel.Debug, message, scope);
export const createErrorLog = (message?: string, scope?: string) => createLog(LumberjackLevel.Error, message, scope);
export const createInfoLog = (message?: string, scope?: string) => createLog(LumberjackLevel.Info, message, scope);
export const createTraceLog = (message?: string, scope?: string) => createLog(LumberjackLevel.Trace, message, scope);
export const createWarningLog = (message?: string, scope?: string) =>
  createLog(LumberjackLevel.Warning, message, scope);
