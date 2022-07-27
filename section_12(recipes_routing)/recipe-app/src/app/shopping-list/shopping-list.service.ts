
import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingrendientsChanged = new EventEmitter<Ingredient[]>();

    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Banana', 5)
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        //Resend the list 
        this.ingrendientsChanged.emit(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]){
        // to many proceses happening below
        // for(let ingredient of ingredients){
        //     this.addIngredient(ingredient);
        // }
        // with the spread operator we can simply spread our ingredients into a list
        this.ingredients.push(...ingredients);
        this.ingrendientsChanged.emit(this.ingredients.slice());
    }
}