import { TestBed } from '@angular/core/testing';

import { expectNgModuleToBeGuardedAgainstDirectImport, resolveDependency } from '@internal/test-util';
import {
  LumberjackConfigLevels,
  lumberjackConfigToken,
  LumberjackLevel,
  LumberjackLogDriver,
  LumberjackLogDriverConfig,
  lumberjackLogDriverToken,
  LumberjackModule,
} from '@ngworker/lumberjack';

import { LumberjackFirestoreDriver } from '../log-drivers/lumberjack-firestore-driver';

import { LumberjackFirestoreDriverInternalConfig } from './lumberjack-firestore-driver-internal.config';
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

function createLumberjackFirestoreDriverOptions(
  extraOptions: { levels?: LumberjackConfigLevels; identifier?: string } = {}
): LumberjackFirestoreDriverOptions {
  return { collectionName, origin, firebaseConfig, ...extraOptions };
}

function createLumberjackFirestoreDriverConfig(
  levels: LumberjackConfigLevels,
  identifier?: string
): LumberjackFirestoreDriverConfig {
  const config = { levels, collectionName, origin, firebaseConfig, identifier };

  if (!identifier) {
    delete config.identifier;
  }

  return config;
}

const createLumberjackFirestoreDriver = (
  {
    config,
    isLumberjackModuleImportedFirst = true,
  }: {
    config: LumberjackFirestoreDriverConfig;
    isLumberjackModuleImportedFirst?: boolean;
  } = {
    config: createLumberjackFirestoreDriverConfig(
      [LumberjackLevel.Verbose],
      LumberjackFirestoreDriver.driverIdentifier
    ),
  }
) => {
  TestBed.configureTestingModule({
    imports: [
      isLumberjackModuleImportedFirst ? LumberjackModule.forRoot() : [],
      LumberjackFirestoreDriverModule.forRoot(config),
      isLumberjackModuleImportedFirst ? [] : LumberjackModule.forRoot(),
    ],
  });

  const [lumberjackFirestoreDriver] = (resolveDependency(lumberjackLogDriverToken) as unknown) as LumberjackLogDriver[];

  return lumberjackFirestoreDriver;
};

const createLumberjackFirestoreDriverWithOptions = (
  {
    isLumberjackModuleImportedFirst = true,
    options,
  }: {
    isLumberjackModuleImportedFirst?: boolean;
    options: LumberjackFirestoreDriverOptions;
  } = {
    options: createLumberjackFirestoreDriverOptions(),
  }
) => {
  TestBed.configureTestingModule({
    imports: [
      isLumberjackModuleImportedFirst ? LumberjackModule.forRoot() : [],
      LumberjackFirestoreDriverModule.withOptions(options),
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

    it('registers the specified log driver configuration given a specified identifier', () => {
      const expectedConfig = createLumberjackFirestoreDriverConfig([LumberjackLevel.Error], 'TestDriverIdentifier');

      const lumberjackFirestoreDriver = createLumberjackFirestoreDriver({ config: expectedConfig });

      const actualConfig = lumberjackFirestoreDriver.config;
      expect(actualConfig).toEqual(expectedConfig as LumberjackFirestoreDriverInternalConfig);
    });

    it('registers the specified log driver configuration given no specified identifier', () => {
      const config = createLumberjackFirestoreDriverConfig([LumberjackLevel.Error]);
      const expectedConfig = { ...config, identifier: LumberjackFirestoreDriver.driverIdentifier };
      const lumberjackFirestoreDriver = createLumberjackFirestoreDriver({ config });

      const actualConfig = lumberjackFirestoreDriver.config;
      expect(actualConfig).toEqual(expectedConfig as LumberjackFirestoreDriverInternalConfig);
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
        identifier: LumberjackFirestoreDriver.driverIdentifier,
      };
      const expectedConfig: LumberjackFirestoreDriverConfig = {
        ...defaultLogDriverConfig,
        ...customLumberjackFirestoreDriverConfig,
      };
      expect(actualConfig).toEqual(expectedConfig as LumberjackFirestoreDriverInternalConfig);
    });

    it('does register the specified log driver configuration when the lumberjack module is imported after the LumberjackFirestoreDriver module', () => {
      const expectedConfig = createLumberjackFirestoreDriverConfig([LumberjackLevel.Debug], 'TestDriverIdentifier');

      const lumberjackFirestoreDriver = createLumberjackFirestoreDriver({
        config: expectedConfig,
        isLumberjackModuleImportedFirst: false,
      });

      const actualConfig = lumberjackFirestoreDriver.config;
      expect(actualConfig).toEqual(expectedConfig as LumberjackFirestoreDriverInternalConfig);
    });
  });

  describe(LumberjackFirestoreDriverModule.withOptions.name, () => {
    it('provides the LumberjackFirestoreDriver', () => {
      const lumberjackFirestoreDriver = createLumberjackFirestoreDriverWithOptions();

      expect(lumberjackFirestoreDriver).toBeInstanceOf(LumberjackFirestoreDriver);
    });

    it('registers the specified options', () => {
      const options = createLumberjackFirestoreDriverOptions();

      const lumberjackFirestoreDriver = createLumberjackFirestoreDriverWithOptions({ options });

      const actualConfig = lumberjackFirestoreDriver.config;
      const expectedConfig: LumberjackFirestoreDriverInternalConfig = {
        ...options,
        // tslint:disable-next-line: no-any
        levels: jasmine.any(Array) as any,
        // tslint:disable-next-line: no-any
        identifier: jasmine.any(String) as any,
      };
      expect(actualConfig).toEqual(expectedConfig);
    });

    it('registers the specified options with custom levels', () => {
      const customLevels: LumberjackConfigLevels = [LumberjackLevel.Critical];
      const options = createLumberjackFirestoreDriverOptions({ levels: customLevels });

      const lumberjackFirestoreDriver = createLumberjackFirestoreDriverWithOptions({ options });

      const actualConfig = lumberjackFirestoreDriver.config;
      const expectedConfig: LumberjackFirestoreDriverInternalConfig = {
        ...options,
        // tslint:disable-next-line: no-any
        levels: customLevels,
        // tslint:disable-next-line: no-any
        identifier: jasmine.any(String) as any,
      };
      expect(actualConfig).toEqual(expectedConfig);
    });

    it('registers the specified options with custom identifier', () => {
      const customIdentifier = 'TestDriverIdentifier';
      const options = createLumberjackFirestoreDriverOptions({ identifier: customIdentifier });

      const lumberjackFirestoreDriver = createLumberjackFirestoreDriverWithOptions({ options });

      const actualConfig = lumberjackFirestoreDriver.config;
      const expectedConfig: LumberjackFirestoreDriverInternalConfig = {
        ...options,
        // tslint:disable-next-line: no-any
        levels: jasmine.any(Array) as any,
        identifier: customIdentifier,
      };
      expect(actualConfig).toEqual(expectedConfig);
    });

    it('gets default options from the log driver config', () => {
      const options = createLumberjackFirestoreDriverOptions();

      const lumberjackFirestoreDriver = createLumberjackFirestoreDriverWithOptions({ options });

      const { levels, identifier } = lumberjackFirestoreDriver.config;
      expect(levels).toEqual([LumberjackLevel.Verbose]);
      expect(identifier).toEqual(LumberjackFirestoreDriver.driverIdentifier);
    });

    it('does register the specified log driver configuration when the lumberjack module is imported after the LumberjackFirestoreDriver module', () => {
      const options = createLumberjackFirestoreDriverOptions();

      const lumberjackFirestoreDriver = createLumberjackFirestoreDriverWithOptions({
        options,
        isLumberjackModuleImportedFirst: false,
      });

      const actualConfig = lumberjackFirestoreDriver.config;
      const expectedConfig: LumberjackFirestoreDriverInternalConfig = {
        ...options,
        // tslint:disable-next-line: no-any
        levels: jasmine.any(Array) as any,
        identifier: LumberjackFirestoreDriver.driverIdentifier,
      };
      expect(actualConfig).toEqual(expectedConfig);
    });
  });
});
