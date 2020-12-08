import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LumberjackLevel, LumberjackModule } from '@ngworker/lumberjack';
import { LumberjackFirestoreDriverModule } from '@ngworker/lumberjack-firestore-driver';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LumberjackModule.forRoot(),
    LumberjackFirestoreDriverModule.forRoot({
      levels: [LumberjackLevel.Verbose],
      firebaseConfig: environment.firebase,
      origin: 'ForestApp',
      collectionName: 'forest-app-logs',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
