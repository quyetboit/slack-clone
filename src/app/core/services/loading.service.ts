import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoadingService {
  private readonly isLoading$ = new BehaviorSubject<boolean>(false);

  get isLoading () {
    return this.isLoading$.asObservable();
  }

  setLoading(isLoading: boolean) {
    this.isLoading$.next(isLoading);
  }
}
