import { Component } from '@angular/core';

@Component({
  selector: 'app-thank-you-page',
  template: `
    <div class="container">
      <h1 class="title">Thank You</h1>
      <p class="content">
          Your order is on the way! 
      </p>
      <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero eum officiis, 
          voluptatum quaerat dolorem officia quod minima nemo quidem sed excepturi mollitia 
          facere at iure eligendi numquam repudiandae accusamus delectus!
      </span>
    </div>
  `,
  styleUrls: ['./thank-you-page.component.scss']
})
export class ThankYouPageComponent {}
