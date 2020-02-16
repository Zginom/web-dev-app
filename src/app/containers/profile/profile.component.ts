import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileService } from './services/profile.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {

  profile$: Observable<any>;
  config = { data: [{ key: 'key' }, { key: 'value' }] };

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profile$ = this.profileService.fetch().pipe(map((resp) => {
      return {
        ...resp,
        birthDate: new Date(+resp.birthDate).toLocaleDateString(),
        hobbies: Object.entries(resp.hobbies).filter(([, value]) => value).map((item) => item[0])
      };
    }));
  }

}
