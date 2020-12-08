import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { LumberjackLevel, LumberjackModule } from '@ngworker/lumberjack';
import { LumberjackFirestoreDriverModule } from '@ngworker/lumberjack-firestore-driver';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [
      LumberjackModule.forRoot(),
      LumberjackFirestoreDriverModule.forRoot({ levels: [LumberjackLevel.Verbose], someNeededOption: 'option-value' }),
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
