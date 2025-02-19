import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from './service/currency.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MaterialModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  selectedCurrency: string = "INR";

  constructor(private currency:CurrencyService) { }

  sendCurrency(event: string) {
    console.log(event);
    this.currency.setCurrency(event);
  }
}
