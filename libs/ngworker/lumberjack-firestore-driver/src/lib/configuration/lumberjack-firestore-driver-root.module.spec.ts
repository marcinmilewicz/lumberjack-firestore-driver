import { LumberjackFirestoreDriverRootModule } from './lumberjack-firestore-driver-root.module';

describe(LumberjackFirestoreDriverRootModule.name, () => {
  it('guards against being registered in multiple injectors', () => {
    const rootInjectorInstance = new LumberjackFirestoreDriverRootModule();

    expect(() => new LumberjackFirestoreDriverRootModule(rootInjectorInstance)).toThrowError(/multiple injectors/);
  });

  it('does not guard the first injector that registers it', () => {
    expect(() => new LumberjackFirestoreDriverRootModule()).not.toThrow();
  });
});
