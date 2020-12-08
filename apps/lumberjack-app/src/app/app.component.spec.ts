import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { LumberjackLevel, LumberjackModule } from '@ngworker/lumberjack';
import { LumberjackFirestoreDriverModule } from '@ngworker/lumberjack-firestore-driver';

import { AppComponent } from './app.component';

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

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [
      LumberjackModule.forRoot(),
      LumberjackFirestoreDriverModule.forRoot({
        levels: [LumberjackLevel.Verbose],
        origin,
        firebaseConfig,
        collectionName,
      }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create the app', () => {
    expect(spectator.component).toBeTruthy();
  });

  it(`should have as title 'lumberjack'`, () => {
    expect(spectator.component.title).toEqual('lumberjack');
  });

  it('should render title', () => {
    const query = spectator.query('.content span');
    expect(query && query.textContent).toContain('lumberjack app is running!');
  });
});
