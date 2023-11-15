import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
    // Código JavaScript modificado para Angular
    const webDesigningCounter = document.getElementById('webDesigningCounter');
    const webDevelopmentCounter = document.getElementById('webDevelopmentCounter');
  

    if (webDesigningCounter && webDevelopmentCounter) {
      this.animateCounter(webDesigningCounter, 15);
      this.animateCounter(webDevelopmentCounter, 506);
      
    }
  }

  ngAfterViewInit(): void {
    // Código adicional que deseas ejecutar después de que la vista se haya renderizado por completo
  }

  animateCounter(element: HTMLElement, finalValue: number): void {
    let currentValue = 0;
    const duration = 3500;
    const stepDuration = 10;
    const stepValue = (finalValue - currentValue) / (duration / stepDuration);

    const counterInterval = setInterval(() => {
      currentValue += stepValue;
      element.textContent = Math.ceil(currentValue).toString();

      if (currentValue >= finalValue) {
        clearInterval(counterInterval);
        element.textContent = finalValue.toString();
      }
    }, stepDuration);
  }
}