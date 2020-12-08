import { TestBed } from '@angular/core/testing';

import { expectNgModuleToBeGuardedAgainstDirectImport } from '@internal/test-util';
import {
  LumberjackConfigLevels,
  lumberjackConfigToken,
  LumberjackLevel,
  LumberjackLogDriver,
  LumberjackLogDriverConfig,
  lumberjackLogDriverToken,
  LumberjackModule,
} from '@ngworker/lumberjack';

import { LumberjackFirestoreDriver } from './lumberjack-firestore-driver';
import { LumberjackFirestoreDriverConfig } from './lumberjack-firestore-driver.config';
import { LumberjackFirestoreDriverModule } from './lumberjack-firestore-driver.module';
import { LumberjackFirestoreDriverOptions } from './lumberjack-firestore-driver.options';

const collectionName = 'collectionName';
const origin = 'originName';
const firebaseConfig = {
  apiKey: 'API_KEY',
  authDomain: 'PROJECT_ID.firebaseapp.com',
  databaseURL: 'https://PROJECT_ID.firebaseio.com',
  projectId: 'PROJECT_ID',
  storageBucket: 'PROJECT_ID.appspot.com',
  messagingSenderId: 'SENDER_ID',
  appId: 'APP_ID',
  measurementId: 'G-MEASUREMENT_ID',
};

function createLumberjackFirestoreDriverOptions(): LumberjackFirestoreDriverOptions {
  return { collectionName, origin, firebaseConfig };
}

function createLumberjackFirestoreDriverConfig(levels: LumberjackConfigLevels): LumberjackFirestoreDriverConfig {
  return { levels, collectionName, origin, firebaseConfig };
}

const createLumberjackFirestoreDriver = (
  {
    config,
    isLumberjackModuleImportedFirst = true,
  }: {
    config: LumberjackFirestoreDriverConfig;
    isLumberjackModuleImportedFirst?: boolean;
  } = { config: createLumberjackFirestoreDriverConfig([LumberjackLevel.Verbose]) }
) => {
  TestBed.configureTestingModule({
    imports: [
      isLumberjackModuleImportedFirst ? LumberjackModule.forRoot() : [],
      LumberjackFirestoreDriverModule.forRoot(config),
      isLumberjackModuleImportedFirst ? [] : LumberjackModule.forRoot(),
    ],
  });

  const [lumberjackFirestoreDriver] = (TestBed.inject(lumberjackLogDriverToken) as unknown) as LumberjackLogDriver[];

  return lumberjackFirestoreDriver;
};

const createLumberjackFirestoreDriverWithOptions = (
  {
    isLumberjackModuleImportedFirst = true,
    options,
    config,
  }: {
    isLumberjackModuleImportedFirst?: boolean;
    options: LumberjackFirestoreDriverOptions;
    config: LumberjackFirestoreDriverConfig;
  } = {
    options: createLumberjackFirestoreDriverOptions(),
    config: createLumberjackFirestoreDriverConfig([LumberjackLevel.Verbose]),
  }
) => {
  TestBed.configureTestingModule({
    imports: [
      isLumberjackModuleImportedFirst ? LumberjackModule.forRoot() : [],
      LumberjackFirestoreDriverModule.withOptions(options, config),
      isLumberjackModuleImportedFirst ? [] : LumberjackModule.forRoot(),
    ],
  });

  const [lumberjackFirestoreDriver] = (TestBed.inject(lumberjackLogDriverToken) as unknown) as LumberjackLogDriver[];

  return lumberjackFirestoreDriver;
};

describe(LumberjackFirestoreDriverModule.name, () => {
  it(`cannot be imported without using the ${LumberjackFirestoreDriverModule.forRoot.name} method`, () => {
    expectNgModuleToBeGuardedAgainstDirectImport(LumberjackFirestoreDriverModule);
  });

  describe(LumberjackFirestoreDriverModule.forRoot.name, () => {
    it('provides the LumberjackFirestoreDriver', () => {
      const lumberjackFirestoreDriver = createLumberjackFirestoreDriver();

      expect(lumberjackFirestoreDriver).toBeInstanceOf(LumberjackFirestoreDriver);
    });

    it('registers the specified log driver configuration', () => {
      const expectedConfig = createLumberjackFirestoreDriverConfig([LumberjackLevel.Error]);

      const lumberjackFirestoreDriver = createLumberjackFirestoreDriver({ config: expectedConfig });

      const actualConfig = lumberjackFirestoreDriver.config;
      expect(actualConfig).toEqual(expectedConfig);
    });

    it('registers a default level configuration if none is specified', () => {
      const customLumberjackFirestoreDriverConfig = createLumberjackFirestoreDriverConfig([LumberjackLevel.Verbose]);

      const lumberjackFirestoreDriver = createLumberjackFirestoreDriver({
        config: customLumberjackFirestoreDriverConfig,
      });

      const actualConfig = lumberjackFirestoreDriver.config;
      const lumberjackConfig = TestBed.inject(lumberjackConfigToken);
      const defaultLogDriverConfig: LumberjackLogDriverConfig = {
        levels: lumberjackConfig.levels,
      };
      const expectedConfig: LumberjackFirestoreDriverConfig = {
        ...defaultLogDriverConfig,
        ...customLumberjackFirestoreDriverConfig,
      };
      expect(actualConfig).toEqual(expectedConfig);
    });

    it('does register the specified log driver configuration when the lumberjack module is imported after the LumberjackFirestoreDriver module', () => {
      const expectedConfig = createLumberjackFirestoreDriverConfig([LumberjackLevel.Debug]);

      const lumberjackFirestoreDriver = createLumberjackFirestoreDriver({
        config: expectedConfig,
        isLumberjackModuleImportedFirst: false,
      });

      const actualConfig = lumberjackFirestoreDriver.config;
      expect(actualConfig).toEqual(expectedConfig);
    });
  });

  describe(LumberjackFirestoreDriverModule.withOptions.name, () => {
    it('provides the LumberjackFirestoreDriver', () => {
      const lumberjackFirestoreDriver = createLumberjackFirestoreDriverWithOptions();

      expect(lumberjackFirestoreDriver).toBeInstanceOf(LumberjackFirestoreDriver);
    });

    it('registers the specified options', () => {
      const options = createLumberjackFirestoreDriverOptions();
      const config = createLumberjackFirestoreDriverConfig([LumberjackLevel.Debug]);

      const lumberjackFirestoreDriver = createLumberjackFirestoreDriverWithOptions({ options, config });

      const actualConfig = lumberjackFirestoreDriver.config;
      const expectedConfig: LumberjackFirestoreDriverConfig = {
        ...options,
        // tslint:disable-next-line: no-any
        levels: jasmine.any(Array) as any,
      };
      expect(actualConfig).toEqual(expectedConfig);
    });

    it('gets common options from the log driver config', () => {
      const options = createLumberjackFirestoreDriverOptions();
      const config = createLumberjackFirestoreDriverConfig([LumberjackLevel.Verbose]);

      const lumberjackFirestoreDriver = createLumberjackFirestoreDriverWithOptions({ options, config });

      const { levels } = lumberjackFirestoreDriver.config;
      expect(levels).toEqual([LumberjackLevel.Verbose]);
    });

    it('does register the specified log driver configuration when the lumberjack module is imported after the LumberjackFirestoreDriver module', () => {
      const options = createLumberjackFirestoreDriverOptions();
      const config = createLumberjackFirestoreDriverConfig([LumberjackLevel.Verbose]);

      const lumberjackFirestoreDriver = createLumberjackFirestoreDriverWithOptions({
        config,
        options,
        isLumberjackModuleImportedFirst: false,
      });

      const actualConfig = lumberjackFirestoreDriver.config;
      const expectedConfig: LumberjackFirestoreDriverConfig = {
        ...options,
        // tslint:disable-next-line: no-any
        levels: jasmine.any(Array) as any,
      };
      expect(actualConfig).toEqual(expectedConfig);
    });
  });
});
