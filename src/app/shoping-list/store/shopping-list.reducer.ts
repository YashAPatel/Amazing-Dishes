import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.module";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State{
    ingredients : Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

export interface AppState{
    shoppingList: State;
}
const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};
export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {

    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENTS:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient ={
                ...Ingredient, 
                ...action.payload
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        case ShoppingListActions.DELETE_INGREDIENTS:
            return {
                ...state,
                ingredients: state.ingredients.filter((ingredient,index) => {
                    return index!=state.editedIngredientIndex;
                }),
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex:action.payload,
                editedIngredient: {...state.ingredients[action.payload]}
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        default:
            return state;
    }
}