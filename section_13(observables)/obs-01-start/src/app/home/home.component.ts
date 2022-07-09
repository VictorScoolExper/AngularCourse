import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });
    const customIntervalObservable = Observable.create((observer)=>{
      let count = 0;
      setInterval(()=>{
        // this sends the variable to the observer
        observer.next(count);
        if(count === 5){
          // notifies that the observable is complete
          observer.complete();
        }
        if(count > 3){
          // when this error ocurrs, it cancels the observable, so it is unneccesary 
          // to unsubscribe.
          observer.error(new Error('message count is greater than 3'))
        }
        count++;
      }, 1000);
    });

    // observable operator, pipe is our operator
    // we subscribe to the observable
    this.firstObsSubscription = customIntervalObservable.pipe(filter(data=>{
      return data > 0;
    }), map((data: number )=>{
      return "Round: " + (data + 1); 
    })).subscribe((data) =>{
      console.log(data);
    }, error =>{
      // this second argument of variable can be used for numerous thing
      // like logging data, sending to database, alerts, etc.
      console.log(error);
      alert(error)
    }, ()=>{
      // this is the completion handler function
      // we can have some clean up here.
      console.log('completed')
    });
  }



  ngOnDestroy(): void {
    // we destroy our subscription
    this.firstObsSubscription.unsubscribe();
  }

}
