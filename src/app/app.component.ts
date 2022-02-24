import { Component, OnInit } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ob: Observable<any> | undefined;

  constructor() {
    console.log("HAPPY PERSON");
    // create the observable stream
    this.ob = new Observable<any>(
      obs => {
        // emit data form this stream
        obs.next(100);
        obs.next('xyz');
        obs.next({ name: 'this is me' });
        obs.complete();
      }
    );
  }

  ngOnInit() {
    this.fxn();
  }

  Subscribe() {
    // create an observer
    const observer = {
      next: (data: any) => console.log(`this is the ${data}`),
      error: (error: any) => console.log(`this is the ${error}`),
      complete: () => console.log(`Complete callback is called`)
    }
     
    // one way
    this.ob?.subscribe(observer);

    // another way
    // this.ob?.subscribe(
    //   data => {
    //     if (data == "200") {

    //     }
    //   },
    //   err => { console.log('this error') }
    // );
  }

  fxn() {
    const stream = of(2,3,4);
    let xyz: Observable<number> = stream.pipe(
      map(item => item * 10 ),
      tap( item => console.log(item+ 'tap wala') )
      );

    xyz.subscribe( data=> console.log(data));
  }

}
