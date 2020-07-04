import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './users/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
	AppComponent
  ],
  imports: [
	BrowserModule,
	AgmCoreModule.forRoot({
	apiKey: 'AIzaSyB6Z3HlDiDGPL2IptxU7iRygR8l498aYU4'
  }),
  AppRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  SharedModule,
  UserModule,
  BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
