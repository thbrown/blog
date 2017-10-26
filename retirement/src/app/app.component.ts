import { Component } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  savings: number = 50000;
  savingsMin: number = 0;
  savingsMax: number = 1000000;
  savingsStep: number = 1000;

  contributions: number = 20000;
  contributionsMin: number = 0;
  contributionsMax: number = 100000;
  contributionsStep: number = 1000;

  expenses: number = 35000;
  expensesMin: number = 0;
  expensesMax: number = 100000;
  expensesStep: number = 1000;

  age: number = 25;
  ageMin: number = 0;
  ageMax: number = 125;
  ageStep: number = 1;

  cost: number = 1000;
  costMin: number = 0;
  costMax: number = 100000;
  costStep: number = 100;

  returnOnInvestment: number = 7;
  returnOnInvestmentMin: number = 0;
  returnOnInvestmentMax: number = 15;
  returnOnInvestmentStep: number = 1;

  inflation: number = 3;
  inflationMin: number = 0;
  inflationMax: number = 15;
  inflationStep: number = 1;

  moneyToRetire: number;
  yearsToRetirement: number;
  yearsToRetirementFormatted: string;
  ageAtRetirement: number;
  retirementDiffDays: number;

  constructor() {
    this.calculateOutput();
   }

   onSavingsInputChange(event): void {
     this.calculateOutput();
   }

   onSavingsSliderChange(event): void {
    this.savings = event.value;
    this.calculateOutput();
  }

  onContributionsInputChange(event): void {
    this.calculateOutput();
  }

  onContributionsSliderChange(event): void {
    this.contributions = event.value;
    this.calculateOutput();
  }

  onExpensesInputChange(event): void {
    this.calculateOutput();
  }

  onExpensesSliderChange(event): void {
    this.expenses = event.value;
    this.calculateOutput();
  }

  onAgeInputChange(event): void {
    this.calculateOutput();
  }

  onAgeSliderChange(event): void {
    this.age = event.value;
    this.calculateOutput();
  }

  onCostInputChange(event): void {
    this.calculateOutput();
  }

  onCostSliderChange(event): void {
    this.cost = event.value;
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

  onReturnOnInvestmentSliderChange(event): void {
    this.returnOnInvestment = event.value;
    this.calculateOutput();
  }

  onInflationInputChange(event): void {
    this.calculateOutput();
  }

  onInflationSliderChange(event): void {
    this.inflation = event.value;
    this.calculateOutput();
  }

  calculateOutput(): void {
    this.moneyToRetire = this.expenses * 25;
    this.yearsToRetirement = 
      this.nper(
        (this.returnOnInvestment - this.inflation) / 100.0 /* rate */,
        -1 * this.contributions /* paymentAmount */,
        -1 * (this.savings - this.cost) /* presentValue, without the $$ you are hypothetically spending */,
        this.moneyToRetire /* futureValue */
      );
    this.yearsToRetirementFormatted = this.yearsToRetirement.toFixed(2);
    if (this.yearsToRetirementFormatted === 'NaN') {
      this.yearsToRetirementFormatted = 'You will never retire!!!';
    }
    this.ageAtRetirement = this.age + this.yearsToRetirement;
    console.log(this.yearsToRetirement);
    console.log(this.calculateRetirementAgeWithoutCost());
    this.retirementDiffDays = (this.yearsToRetirement - this.calculateRetirementAgeWithoutCost()) * 365;
  }

  calculateRetirementAgeWithoutCost(): number {
    return this.nper(
      (this.returnOnInvestment - this.inflation) / 100.0 /* rate */,
      -1 * this.contributions /* paymentAmount */,
      -1 * this.savings /* presentValue */,
      this.moneyToRetire /* futureValue */
    );
  }

  nper(rate: number, paymentAmount: number, presentValue: number, futureValue: number) {
    if (rate === 0) {
      // presentValue and paymentAmount are inverted because reasons.
      // TODO(Lauren): Add reasons.
      // We need to uninvert them here.
      return (futureValue - (presentValue * -1.0) ) / (paymentAmount * -1.0);
    }

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
