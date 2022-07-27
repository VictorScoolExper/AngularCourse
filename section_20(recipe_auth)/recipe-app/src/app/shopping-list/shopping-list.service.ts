import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingrendientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Banana', 5)
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index: number){
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        //Resend the list 
        this.ingrendientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]){
        // to many proceses happening below
        // for(let ingredient of ingredients){
        //     this.addIngredient(ingredient);
        // }
        // with the spread operator we can simply spread our ingredients into a list
        this.ingredients.push(...ingredients);
        this.ingrendientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingrendientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index, 1);
        this.ingrendientsChanged.next(this.ingredients.slice());
    }
}