import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CambioestiloscssService {

  private navigationState = new BehaviorSubject<string>('default');

  getNavigationState() {
    return this.navigationState.asObservable();
  }

  setNavigationState(state: string) {
    this.navigationState.next(state);
  }
}
