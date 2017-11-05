import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CalculatorComponent } from '../howMuchIsBuyingThisThingGoingToDelayMyRetirement/calculator/calculator.component';
import { HowMuchIsBuyingThisThingGoingToDelayMyRetirementComponent } from '../howMuchIsBuyingThisThingGoingToDelayMyRetirement/howMuchIsBuyingThisThingGoingToDelayMyRetirement.component';
import { ShareButtonsComponent } from '../shareButtons/shareButtons.component'

import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatSliderModule, MatToolbarModule } from '@angular/material';

const routes: Routes = [
  // Maybe read this? http://vsavkin.tumblr.com/post/146722301646/angular-router-empty-paths-componentless-routes
  { path: 'calculator', component: CalculatorComponent },
  // { path: 'calculator/:savings', component: CalculatorComponent},
  { path: 'howMuchIsBuyingThisThingGoingToDelayMyRetirement', component: HowMuchIsBuyingThisThingGoingToDelayMyRetirementComponent },
  { path: '', redirectTo: 'howMuchIsBuyingThisThingGoingToDelayMyRetirement', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    HowMuchIsBuyingThisThingGoingToDelayMyRetirementComponent,
    ShareButtonsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
    MatToolbarModule,
    RouterModule.forRoot(
      routes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
