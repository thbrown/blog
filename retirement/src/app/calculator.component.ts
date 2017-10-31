import { OnInit, Component } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/map';

@Component({
  selector: 'calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {

  static readonly SAVINGS_MIN: number = 0;
  static readonly SAVINGS_MAX: number = 1000000;
  static readonly CONTRIBUTIONS_MIN: number = 0;
  static readonly CONTRIBUTIONS_MAX: number = 60000;
  static readonly EXPENSES_MIN: number = 0;
  static readonly EXPENSES_MAX: number = 100000;
  static readonly AGE_MIN: number = 15;
  static readonly AGE_MAX: number = 125;
  static readonly COST_MIN: number = 0;
  static readonly COST_MAX: number = 100000;
  static readonly RETURN_ON_INVESTMENT_MIN: number = 0;
  static readonly RETURN_ON_INVESTMENT_MAX: number = 15;
  static readonly INFLATION_MIN: number = 0;
  static readonly INFLATION_MAX: number = 15;

  savings: number = 5000;
  savingsMin: number = CalculatorComponent.SAVINGS_MIN;
  savingsMax: number = CalculatorComponent.SAVINGS_MAX;
  savingsStep: number = 1000;

  contributions: number = 18000;
  contributionsMin: number = CalculatorComponent.CONTRIBUTIONS_MIN;
  contributionsMax: number = CalculatorComponent.CONTRIBUTIONS_MAX;
  contributionsStep: number = 1000;

  expenses: number = 75000;
  expensesMin: number = CalculatorComponent.EXPENSES_MIN;
  expensesMax: number = CalculatorComponent.EXPENSES_MAX;
  expensesStep: number = 1000;

  age: number = 30;
  ageMin: number = CalculatorComponent.AGE_MIN;
  ageMax: number = CalculatorComponent.AGE_MAX;
  ageStep: number = 1;

  cost: number = 1000;
  costMin: number = CalculatorComponent.COST_MIN;
  costMax: number = CalculatorComponent.COST_MAX;
  costStep: number = 100;

  returnOnInvestment: number = 7;
  returnOnInvestmentMin: number = CalculatorComponent.RETURN_ON_INVESTMENT_MIN;
  returnOnInvestmentMax: number = CalculatorComponent.RETURN_ON_INVESTMENT_MAX;
  returnOnInvestmentStep: number = 1;

  inflation: number = 3;
  inflationMin: number = CalculatorComponent.INFLATION_MIN;
  inflationMax: number = CalculatorComponent.INFLATION_MAX;
  inflationStep: number = 1;

  moneyToRetire: number;
  yearsToRetirement: number;
  yearsToRetirementFormatted: string;
  ageAtRetirementFormatted: string;
  retirementDiffString: string;
  netRate: number;

  constructor(private route: ActivatedRoute) {
    this.calculateOutput();
  }

  ngOnInit() {
    // This doesn't work.
    console.log('before')
    const savings =  this.route.paramMap.map((params: ParamMap) => {
      return params.get('savings');
    });
    console.log(savings)
    console.log('after')
  }

  adjustSliderBounds(variableName: string): void {
    const variableNameMin = variableName + 'Min';
    const variableNameMax = variableName + 'Max';
    
    if (this[variableName] < this[variableNameMin]) {
      this[variableNameMin] = this[variableName];
    }
    if (this[variableName] > this[variableNameMax]) {
      this[variableNameMax] = this[variableName];
    }
    this.calculateOutput();
  }

  onSliderChange(): void {
    this.calculateOutput();
  }

  calculateOutput(): void {
    this.netRate = (this.returnOnInvestment - this.inflation) / 100.0;
    this.moneyToRetire = this.expenses * 1 / this.netRate;
    this.yearsToRetirement = 
      this.nper(
        this.netRate /* rate */,
        -1 * this.contributions /* paymentAmount */,
        -1 * (this.savings - this.cost) /* presentValue, without the $$ you are hypothetically spending */,
        this.moneyToRetire /* futureValue */
      );
    this.yearsToRetirementFormatted = this.formatYears(this.yearsToRetirement);
    this.ageAtRetirementFormatted = this.formatYears(this.age + this.yearsToRetirement);
    this.retirementDiffString = this.secondsToFormattedTimeString(
      (this.yearsToRetirement - this.calculateYearsToRetirementWithoutCost(this.netRate)) * 31536000);
  }

  formatYears(years: number): string {
    return (isNaN(years) || !isFinite(years) || this.isNetRateInvalid()) ? 'You will never retire!!!' : this.yearsToRetirement.toFixed(2);
  }

  calculateYearsToRetirementWithoutCost(netRate: number): number {
    return this.nper(
      netRate /* rate */,
      -1 * this.contributions /* paymentAmount */,
      -1 * this.savings /* presentValue */,
      this.moneyToRetire /* futureValue */
    );
  }

  nper(rate: number, paymentAmount: number, presentValue: number, futureValue: number) {
    if (rate === 0) {
      // presentValue and paymentAmount are inverted because nper is traditionally drawn down,
      // not accumulated up.
      // We need to uninvert them here.
      return (futureValue - (presentValue * -1.0) ) / (paymentAmount * -1.0);
    }

    const endOrBeginning: number = 0;
    const numerator: number = paymentAmount * (1 + rate * endOrBeginning) - futureValue * rate;
    const denominator = (presentValue * rate + paymentAmount * (1 + rate * endOrBeginning));
    return Math.log(numerator / denominator) / Math.log(1 + rate);
  }

  formatMoney(n): string {
    return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }

  isNetRateInvalid(): boolean {
    return this.netRate != 0;
  }

  secondsToFormattedTimeString(seconds: number): string{
    if (isNaN(seconds)) {
      return 'You will never retire!!!';
    }
    const numYears = Math.floor(seconds / 31536000);
    const numDays = Math.floor((seconds % 31536000) / 86400); 
    const numHours = Math.floor(((seconds % 31536000) % 86400) / 3600);
    const numMinutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    const numSeconds = (((seconds % 31536000) % 86400) % 3600) % 60;
    
    return (numYears == 0 ? "" : numYears + " year(s) ") +
        (numDays == 0 ? "" : numDays + " day(s) ") +
        (numHours == 0 ? "" : numHours + " hour(s) ") +
        (numMinutes == 0 ? "" : numMinutes + " minute(s) ") +
        (numSeconds == 0 ? "" : numSeconds.toFixed(0) + " second(s)");
  }
}
