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

function createLumberjackFirestoreDriverOptions(): LumberjackFirestoreDriverOptions {
  return {
    someNeededOption: 'some-options',
  };
}

function createLumberjackFirestoreDriverConfig(levels: LumberjackConfigLevels): LumberjackFirestoreDriverConfig {
  return {
    levels,
    someNeededOption: 'some-options',
  };
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
  }: {
    isLumberjackModuleImportedFirst?: boolean;
    options: LumberjackFirestoreDriverOptions;
  } = { options: createLumberjackFirestoreDriverOptions() }
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

      const lumberjackFirestoreDriver = createLumberjackFirestoreDriverWithOptions({ options });

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

      const lumberjackFirestoreDriver = createLumberjackFirestoreDriverWithOptions({ options });

      const { levels } = lumberjackFirestoreDriver.config;
      expect(levels).toEqual([LumberjackLevel.Verbose]);
    });

    it('does register the specified log driver configuration when the lumberjack module is imported after the LumberjackFirestoreDriver module', () => {
      const options = createLumberjackFirestoreDriverOptions();

      const lumberjackFirestoreDriver = createLumberjackFirestoreDriverWithOptions({
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
