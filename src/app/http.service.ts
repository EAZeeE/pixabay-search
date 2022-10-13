import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {SearchResponse} from "./image-search/search-response";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  useProxy$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  searchImages(query: string, page: any, per_page: any): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(environment.apiUrl, {
      params: {
        key: environment.key,
        q: encodeURIComponent(query),
        page: page + 1,
        per_page
      }
    })
  }

}
