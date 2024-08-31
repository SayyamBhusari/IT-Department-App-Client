import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProgressService } from './progress.service';

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {

  constructor(private progressService: ProgressService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total) {
            const progress = Math.round(100 * event.loaded / event.total);
            this.progressService.setProgress(progress);
          }
        } else if (event.type === HttpEventType.Response) {
          this.progressService.setProgress(null); // Reset progress when response is received
        }
      })
    );
  }
}
