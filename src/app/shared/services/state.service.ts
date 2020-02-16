import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StateService {
    access: BehaviorSubject<boolean> = new BehaviorSubject(false);
    unsaved: BehaviorSubject<boolean> = new BehaviorSubject(false);
    lang: string = 'pl';
    serverInfo: Subject<string> = new Subject();
}
