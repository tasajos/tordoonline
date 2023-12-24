import { Component,OnInit  } from '@angular/core';

@Component({
  selector: 'app-cbolivia',
  templateUrl: './cbolivia.component.html',
  styleUrls: ['./cbolivia.component.css']
})
export class CboliviaComponent {
  constructor() { }

  ngOnInit(): void {
    console.log("Componente inicializado");
    this.setupJavaScript();
  }

  setupJavaScript(): void {
    const content = document.querySelector('.content p');
    if (!content) return;
  
    const getTxt = content.textContent || '';
    const realTxt = [getTxt];
    let words = getTxt.split(' ');
    const wordsLimit = 40;
  
    if (words.length > wordsLimit) {
      words = words.slice(0, wordsLimit);
      content.textContent = `${words.join(' ')}...`;
    }
  
    // Evento para 'show more/show less'
    const readMore = document.querySelector('.readmore h3');
    readMore?.addEventListener('click', () => {
      if (readMore.textContent === 'show more') {
        content.textContent = realTxt.join(' ');
        readMore.textContent = 'show less';
      } else {
        content.textContent = `${words.join(' ')}...`;
        readMore.textContent = 'show more';
      }
    });
  
    // Evento para 'like'
    const like = document.querySelector('.like');
    like?.addEventListener('click', () => {
      like.classList.toggle('clicked');
    });
}}