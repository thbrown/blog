import { OnInit, Component } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import 'rxjs/add/operator/map';

@Component({
  selector: 'howMuchIsBuyingThisThingGoingToDelayMyRetirement',
  templateUrl: './howMuchIsBuyingThisThingGoingToDelayMyRetirement.component.html',
  styleUrls: ['./howMuchIsBuyingThisThingGoingToDelayMyRetirement.component.scss'],
})
export class HowMuchIsBuyingThisThingGoingToDelayMyRetirementComponent implements OnInit {

  constructor(private route: ActivatedRoute, private meta: Meta, private titleService: Title) {
    let title = "Retirement";
    let description = "Calculator to help determine how much later you will retire if you buy something instead of investing the money";
    let author = "Perpetual WIPs";
    let url = "https://github.com/thbrown/retirement";
    let home = "https://github.com/thbrown"
    let image = "https://i.imgur.com/4AW1ZGk.jpg";
    let keywords = "Finance,Retirement,Opportunity,Cost,Time,Calculator";

    /*
    Maybe wait till we actually have a connonical link
    <link rel="canonical" href="https://github.com/thbrown/retirement" />
    */

    // General meta tags
    titleService.setTitle(title);
    meta.addTag({name: 'author', content: url});
    meta.addTag({name: 'cannonical', content: keywords});
    meta.addTag({name: 'description', content: description});
    meta.addTag({name: 'keywords', content: keywords});

    // Facebook/Google+
    meta.addTag({property: 'og:title', content: title});
    meta.addTag({property: 'og:image', content: image});
    meta.addTag({property: 'og:description', content: description});
    meta.addTag({property: 'og:site_name', content: author});
    meta.addTag({property: 'og:see_also', content: home});

    // Twitter
    meta.addTag({name: 'twitter:title', content: title});
    meta.addTag({name: 'twitter:image', content: image});
    meta.addTag({name: 'twitter:image:alt', content: 'Hot n Spicy McChicken'});
    meta.addTag({name: 'twitter:card', content: 'summary'});
    meta.addTag({name: 'twitter:description', content: description});
    meta.addTag({name: 'twitter:url', content: url});
  }

  ngOnInit() {
    // This doesn't work.
    // console.log('before')
    // const savings =  this.route.paramMap.map((params: ParamMap) => {
    //   return params.get('savings');
    // });
    // console.log(savings)
    // console.log('after')
  }
}
