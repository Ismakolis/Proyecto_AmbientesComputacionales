import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    ...appConfig.providers // Si `appConfig` incluye otros providers
  ]
}).catch((err) => console.error(err));
