import { Component } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  retirementContributions: number = 20000;
  currentRetirementSavings: number = 50000;
  expenses: number = 35000;

  returnOnInvestment: number = 7;
  returnOnInvestmentMin: number = 0;
  returnOnInvestmentMax: number = 15;
  returnOnInvestmentStep: number = 1;
  returnOnInvestmentTickInterval: number = 1;
  inflation: number = 3;

  moneyToRetire: number;
  moneyToRetireFormatted: string;
  yearsToRetirement: number;
  yearsToRetirementFormatted: string;

  constructor() {
    this.calculateOutput();
   }

  onRetirementContributionsInputChange(event): void {
    // TODO(Lauren): Add slider.
    this.calculateOutput();
  }

  onExpensesInputChange(event): void {
    // TODO(Lauren): Add slider.
    this.calculateOutput();
  }

  onCurrentRetirementSavingsInputChange(event): void {
    this.calculateOutput();
  }

  onReturnOnInvestmentSliderChange(event): void {
    this.returnOnInvestment = event.value;
    this.calculateOutput();
  }

  onReturnOnInvestmentInputChange(event): void {
    if (this.returnOnInvestment < this.returnOnInvestmentMin) {
      this.returnOnInvestment = this.returnOnInvestmentMin;
    }
    if (this.returnOnInvestment > this.returnOnInvestmentMax) {
      this.returnOnInvestment = this.returnOnInvestmentMax;
    }
    this.calculateOutput();
  }

  onInflationInputChange(event): void {
    this.calculateOutput();
  }

  calculateOutput(): void {
    this.moneyToRetire = this.expenses * 25;
    this.moneyToRetireFormatted = '$' + this.formatMoney(this.moneyToRetire);
    this.yearsToRetirement = 
      this.nper(
        (this.returnOnInvestment - this.inflation) / 100.0,
        -1 * this.retirementContributions,
        -1 * this.currentRetirementSavings,
        this.moneyToRetire
      );
    this.yearsToRetirementFormatted = this.yearsToRetirement.toFixed(2);
    if (this.yearsToRetirementFormatted === 'NaN') {
      this.yearsToRetirementFormatted = 'You will never retire!!!';
    }
  }

  nper(rate: number, paymentAmount: number, presentValue: number, futureValue: number) {
    const endOrBeginning: number = 0;
    let numerator: number = paymentAmount * (1 + rate * endOrBeginning) - futureValue * rate;
    let denominator = (presentValue * rate + paymentAmount * (1 + rate * endOrBeginning));
    return Math.log(numerator / denominator) / Math.log(1 + rate);
  }

  formatMoney(n): string {
    return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }

  title = 'Lauren';
}
