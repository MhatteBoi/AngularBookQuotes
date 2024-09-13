import { Component } from '@angular/core';

@Component({
  selector: 'app-my-quotes',
  templateUrl: './my-quotes.component.html',
  styleUrls: ['./my-quotes.component.css']
})
export class MyQuotesComponent {
  quotes: string[] = [
  "All we have to decide is what to do with the time that is given to us."];
  newQuote: string = '';

  addQuote() {
    if (this.newQuote.trim()) {
      this.quotes.push(this.newQuote.trim());
      this.newQuote = ''; // Rensa inputfältet
    }
  }

  deleteQuote(index: number) {
    this.quotes.splice(index, 1);
  }
}
