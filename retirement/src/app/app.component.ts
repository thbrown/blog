import { OnInit, Component } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
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
}
