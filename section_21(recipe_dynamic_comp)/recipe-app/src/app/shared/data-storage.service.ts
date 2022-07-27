import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    private url: string = 'https://recipeangular2022-default-rtdb.firebaseio.com/';

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }

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
        // take is that i only want to take 1 value then unsubscribe
        // exhaistMap waits for the first observable, then returns obersvable

        return this.http
            .get<Recipe[]>(
                this.url + 'recipes.json'
            ).pipe(map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            }));
    }
}