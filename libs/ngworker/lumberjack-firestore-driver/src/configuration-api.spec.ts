import { InjectionToken } from '@angular/core';

import { isClass } from '@internal/test-util';

import {
  LumberjackFirestoreDriverConfig,
  LumberjackFirestoreDriverModule,
  LumberjackFirestoreDriverOptions,
} from './index';
import { lumberjackFirestoreDriverConfigToken } from './lib/configuration/lumberjack-firestore-driver-config.token';

describe('Configuration API', () => {
  describe('Interfaces', () => {
    it('exposes LumberjackFirestoreDriverConfig', () => {
      const value: LumberjackFirestoreDriverConfig | undefined = undefined;

      expect(value).toBeUndefined();
    });
  });

  describe('Types', () => {
    it('exposes LumberjackFirestoreDriverOptions', () => {
      const value: LumberjackFirestoreDriverOptions | undefined = undefined;

      expect(value).toBeUndefined();
    });
  });

  describe('Dependency injection tokens', () => {
    it('exposes lumberjackFirestoreDriverConfigToken', () => {
      const sut = lumberjackFirestoreDriverConfigToken;

      expect(sut).toBeInstanceOf(InjectionToken);
    });
  });

  describe('Angular modules', () => {
    it(`exposes ${LumberjackFirestoreDriverModule.name}`, () => {
      const sut = LumberjackFirestoreDriverModule;

      expect(isClass(sut)).withContext(`${sut.name} is not a class`).toBeTrue();
    });
  });
});
