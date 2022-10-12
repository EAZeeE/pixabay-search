import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {
  BehaviorSubject,
  combineLatestWith,
  debounceTime,
  from, Subject,
  switchMap, takeUntil, tap
} from "rxjs";
import {HttpService} from "../http.service";
import {animate, group, query, stagger, state, style, transition, trigger} from "@angular/animations";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.scss'],
  animations: [
    trigger('cardTransition', [
      transition('* => *', [
        group([
          query(':leave', [
            animate(200, style({
              opacity: 0
            }))
          ], {optional: true}),
          query(':enter', [
            style({
              opacity: 0
            }),
            stagger(
              30, [
                animate(180, style({
                  opacity: 1
                }))
              ]
            )
          ], {optional: true})
        ]),
      ])
    ]),
    trigger('cardLoad', [
      state('load', style({
        opacity: 0.1
      })),
      transition(
        'load => done', [
          style({opacity: 0.1}),
          animate(500, style({
            opacity: 1
          }))
        ]
      )
    ])
  ]
})
export class ImageSearchComponent implements OnInit {

  loadedImages: number[] = [];

  form = this.fb.group({
    search: ''
  })

  page$: BehaviorSubject<any> = new BehaviorSubject({
    pageIndex: 0,
    pageSize: 20,
    previousPageIndex: 0,
    length: 0
  })

  loading = false

  searchRes$ = from(
    this.form.get('search')!.valueChanges
  ).pipe(
    combineLatestWith([this.page$]),
    debounceTime(200),
    switchMap(([q, page]: any) => {
      this.loading = true
      return this.httpService.searchImages(q!, page.pageIndex, page.pageSize)
    }),
    tap(() => {
      this.loading = false
      // this.loadedImages = []
    })
  )

  destroyed = new Subject<void>()

  // Create a map to display breakpoint names for demonstration purposes.
  displayNameMap = new Map([
    [Breakpoints.XSmall, 2],
    [Breakpoints.Small, 2],
    [Breakpoints.Medium, 3],
    [Breakpoints.Large, 4],
    [Breakpoints.XLarge, 4],
  ])

  numberOfColumns = 4;

  constructor(private fb: FormBuilder, private httpService: HttpService, breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.numberOfColumns = this.displayNameMap.get(query) ?? 2;
          }
        }
      });
  }

  ngOnInit(): void {
    this.form.get('search')?.setValue('cat and dog')
  }

}
