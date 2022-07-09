import { 
  AfterContentChecked, 
  AfterContentInit, 
  AfterViewChecked, 
  AfterViewInit, 
  Component, 
  ContentChild, 
  DoCheck, 
  ElementRef, 
  Input, 
  OnChanges, 
  OnDestroy, 
  OnInit, 
  SimpleChange, 
  ViewChild, 
  ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated // this value is default
})
export class ServerElementComponent implements
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {
  @Input('srvElement') element: { type: string, name: string, content: string }
  @Input() name: string;
  @ViewChild('heading', {static: true}) header: ElementRef;
  //comes from app.component.html
  @ContentChild('contentParagraph', {static: true}) paragraph: ElementRef;

  constructor() {
    console.log('constructor called');
  }

  ngOnChanges(changes: SimpleChange): void {
    console.log('ngOnChanges called');
    console.log(changes);
    console.log('text Content: ' + this.header.nativeElement.textContent);
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    console.log('Text content of paragrapgh: ' + this.paragraph.nativeElement.textContent);
  }
  //gets called by events, promised 
  ngDoCheck(): void {
    console.log('ngDoChecked called')
  }

  ngAfterContentInit(): void {
    console.log('ngAfterInit called');
    console.log('Text content of paragrapgh: '+ this.paragraph.nativeElement.textContent);
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called');
    console.log('text Content: ' + this.header.nativeElement.textContent);
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called')
  }
}
