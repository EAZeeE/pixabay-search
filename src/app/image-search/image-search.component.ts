import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {
  BehaviorSubject, catchError,
  combineLatestWith,
  debounceTime,
  from, Subject,
  switchMap, takeUntil, tap
} from "rxjs";
import {HttpService} from "../http.service";
import {animate, group, query, stagger, state, style, transition, trigger} from "@angular/animations";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

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

export class ImageSearchComponent {

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
  error = false

  searchRes$ = from(
    this.form.get('search')!.valueChanges
  ).pipe(
    combineLatestWith([this.page$]),
    debounceTime(200),
    switchMap(([q, page]: any) => {
      this.error = false
      this.loading = true
      return this.httpService.searchImages(q!, page.pageIndex, page.pageSize).pipe(catchError((e) => {
        this.handleError(e)
        return from([])
      }))
    }),
    tap(() => {
      this.loading = false
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

  proxyToggleValue = false
  proxyOn = this.httpService.useProxy$

  constructor(private fb: FormBuilder, private httpService: HttpService, private _snackBar: MatSnackBar, breakpointObserver: BreakpointObserver) {
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
            this.numberOfColumns = this.displayNameMap.get(query) ?? 2
          }
        }
      });
  }

  toggleProxy(toggleChange: MatSlideToggleChange) {
    this.proxyOn.next(toggleChange.checked)
  }

  private handleError(e: HttpErrorResponse) {
    if (e.message) {
      console.error(e.message)
    }
    this.loading = false
    this.error = true

    const snack = this._snackBar.open(
      this.httpService.useProxy$.value ? 'An unknown error occurred.  Please try again in a minute.' :
        'Try enabling the proxy'
      , this.httpService.useProxy$.value ? 'Close' : 'Enable',
      {
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      }
    );

    if(!this.proxyToggleValue) {
      snack.onAction().pipe(takeUntil(snack.afterDismissed())).subscribe(
        () => {
          this.httpService.useProxy$.next(true)
          this.proxyToggleValue = true
        }
      )
    }
  }
}
