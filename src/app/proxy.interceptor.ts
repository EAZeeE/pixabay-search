import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../environments/environment";
import {HttpService} from "./http.service";

@Injectable()
export class ProxyInterceptor implements HttpInterceptor/*, OnDestroy*/ {

  api = environment.apiUrl
  proxyUrn = 'https://proxy.cors.sh/'

  constructor(private httpService: HttpService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.httpService.useProxy$.value && request.url.startsWith(this.api)) {
      return next.handle(request.clone({
        url: this.proxyUrn + request.url
      }));
    }
    return next.handle(request)
  }
}
