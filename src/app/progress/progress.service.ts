import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private progressSubject = new BehaviorSubject<number | null>(null);
  progress$ = this.progressSubject.asObservable();

  setProgress(progress: number | null) {
    this.progressSubject.next(progress);
  }
}
