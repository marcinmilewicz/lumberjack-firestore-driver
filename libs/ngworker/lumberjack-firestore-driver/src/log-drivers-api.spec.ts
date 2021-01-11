import { isClass } from '@internal/test-util';

import { LumberjackFirestoreDriver } from './index';

describe('Log drivers API', () => {
  describe('Services', () => {
    it(`exposes ${LumberjackFirestoreDriver.name}`, () => {
      const sut = LumberjackFirestoreDriver;

      expect(isClass(sut)).withContext(`${sut.name} is not a class`).toBeTrue();
    });
  });
});
