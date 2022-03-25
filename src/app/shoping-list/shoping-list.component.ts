import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.module';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css']
})
export class ShopingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ingredients: Ingredient[] }>;
  //private subscription: Subscription;

  constructor(private loggingService: LoggingService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    /* this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) =>{
          this.ingredients=ingredients;
        }
      ); */
      this.loggingService.printLog('Hello from ShoppinListComponent ngOnInit');
  }

  onEditItem(index: number){
    //this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }
  ngOnDestroy(){
    //this.subscription.unsubscribe();
  }
}
