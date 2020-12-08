import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LumberjackLevel, LumberjackModule } from '@ngworker/lumberjack';
import { LumberjackFirestoreDriverModule } from '@ngworker/lumberjack-firestore-driver';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LumberjackModule.forRoot(),
    LumberjackFirestoreDriverModule.forRoot({ levels: [LumberjackLevel.Verbose], someNeededOption: 'option-value' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
