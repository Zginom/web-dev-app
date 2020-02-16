import { environment } from '../../environments/environment';

export class Api {
    static ITEMS_END_POINT = environment.BASE_END_POINT + 'items';
    static DOES_IT_EXIST = environment.BASE_END_POINT + 'does-it-exist';
    static WORKERS_END_POINT = environment.BASE_END_POINT + 'workers';
    static LOGIN_END_POINT = environment.BASE_END_POINT + 'login';
    static LOGOUT_END_POINT = environment.BASE_END_POINT + 'logout';
    static LOGGED_END_POINT = environment.BASE_END_POINT + 'logged';
    static REGISTER_END_POINT = environment.BASE_END_POINT + 'register';
    static PROFILE_END_POINT = environment.BASE_END_POINT + 'profile';
    static UPLOAD_END_POINT = environment.BASE_END_POINT + 'upload';
    static UNREGISTER = environment.BASE_END_POINT + 'unregister';
}
