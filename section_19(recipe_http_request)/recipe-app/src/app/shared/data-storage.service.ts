import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    private url: string = 'https://recipeangular2022-default-rtdb.firebaseio.com/';

    constructor(private http: HttpClient, private recipeService: RecipeService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        return this.http.put(
            this.url + 'recipes.json',
            recipes
        )
            .subscribe(response => {
                console.log(response);
            })
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(
            this.url + 'recipes.json'
        )
        .pipe(
            map( recipes =>{
                return recipes.map(recipe =>{
                    return{
                        ...recipe, 
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
            }),
            tap(recipes =>{
                this.recipeService.setRecipes(recipes);
            })
        )
        
    }
}