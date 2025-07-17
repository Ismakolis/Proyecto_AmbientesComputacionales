import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  private endpoint = 'logout';

  constructor(private api: ApiService) {}

  logout(): Observable<any> {
    return this.api.post(this.endpoint, {});
  }
}
