import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';

// state for reducer
export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient,
    editedIngredientIndex: number
};


const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Banana', 5)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

//give it default value, action is an interpace with atype property
export function shoppingListReducer(
    state: State = initialState, 
    action: ShoppingListActions.ShoppingListActions
){
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                // pulls out all property of state(copy old state)
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state, 
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                // we copy index of ingredients
                ...ingredient,
                // then copy changed ingredients
                ...action.payload
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
            
            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        case ShoppingListActions.DELETE_INGREDIENT:

            return {
                ...state,
                // filter will return array and index which can then be manipulated 
                // by a function
                ingredients: state.ingredients.filter((ig, igIndex) =>{
                    // we must return true or false for every ingredient.
                    // if it is avaiable in payload we return that is element 
                    // we want to remove.
                    return igIndex !== state.editedIngredientIndex;
                }),
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        case ShoppingListActions.START_EDIT:
            return{
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: { ...state.ingredients[action.payload] }
            };
        case ShoppingListActions.STOP_EDIT:
            return{
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        default: 
            return state;
    }
}   