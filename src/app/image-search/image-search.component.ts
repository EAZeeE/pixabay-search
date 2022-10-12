import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {
  BehaviorSubject,
  combineLatestWith,
  debounceTime,
  from,
  Subscription,
  switchMap
} from "rxjs";
import {HttpService} from "../http.service";

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.scss']
})
export class ImageSearchComponent implements OnInit {

  form = this.fb.group({
    search: ''
  })

  page$: BehaviorSubject<any> = new BehaviorSubject({
    pageIndex: 0,
    pageSize: 20,
    previousPageIndex: 0,
    length: 0
  })

  subs: Subscription[] = []

  searchRes$ = from(
    this.form.get('search')!.valueChanges
  ).pipe(
    combineLatestWith([this.page$]),
    debounceTime(200),
    switchMap(([q, page]: any) => this.httpService.searchImages(q!, page.pageIndex, page.pageSize))
  )

  constructor(private fb: FormBuilder, private httpService: HttpService) { }

  ngOnInit(): void {
    this.form.get('search')?.setValue('cat and dog')
  }

}
