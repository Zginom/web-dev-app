import { Component } from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'item-details',
  templateUrl: './item-details.component.html'
})
export class ItemDetailsComponent {

  data: Observable<Data>;

  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.data = route.data.pipe(map(({ item }) => item));
  }

  goBack() {
    this.router.navigate(['/items']);
  }
}
