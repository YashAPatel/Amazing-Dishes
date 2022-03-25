import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({providedIn:'root'})
export class AuthService {
    private tokenexpirationTimer: any;

    constructor(private store: Store<fromApp.AppState>){}

    setLogoutTimer(expirationDuration: number){
        this.tokenexpirationTimer = setTimeout(()=> {
            this.store.dispatch(new AuthActions.Logout());
        },expirationDuration);
    }

    clearLogoutTimer(){
        if(this.tokenexpirationTimer){
            clearTimeout(this.tokenexpirationTimer);
            this.tokenexpirationTimer=null;
        }
    }
}