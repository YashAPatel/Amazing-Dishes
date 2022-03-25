import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
    isAuthenticated = false;
    private usersub: Subscription;

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit(){
        this.usersub = this.store.select('auth').pipe(map(authState=>authState.user)).subscribe(user => {
            this.isAuthenticated = !!user;
            console.log(!user);
            console.log(!!user);
        });
    }
    onSaveData(){
        this.store.dispatch(new RecipeActions.StoreRecipes())
    }

    onFetchData(){
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }

    onLogout(){
        this.store.dispatch(new AuthActions.Logout());
    }

    ngOnDestroy(){
        this.usersub.unsubscribe();
    }
}