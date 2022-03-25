import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs/operators';
import * as RecipeActions from '../store/recipe.actions';
import * as ShoppingListActions from 'src/app/shoping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  recipe : Recipe;
  id: number;
  subscription: Subscription;
  
  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>){}

  ngOnInit(): void {
    this.subscription=this.route.params
      .pipe(
        map(params =>{
          return +params['id'];
        }),
        switchMap(id =>{
          this.id=id;
          return this.store.select('recipes');
        }),
        map(recipeState =>{
          return recipeState.recipes.find((recipe,index)=>{
            return index === this.id;
          });
        })
      )
      .subscribe(recipe =>{
        this.recipe = recipe;
      });
  }

  onAddToShoppingList(){
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients))
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
    //this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    //this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipeActions.DeleteRecipes(this.id));
    this.router.navigate(['/recipes']);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
