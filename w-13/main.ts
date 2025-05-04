import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { Approuter } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [Approuter]
});
