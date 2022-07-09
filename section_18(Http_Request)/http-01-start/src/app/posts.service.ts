import { Injectable } from "@angular/core";
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from "./post.model";
import { map, catchError, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

@Injectable({
    // can also be declared in appModule
    providedIn: 'root'
})
export class PostsService {
    error = new Subject<string>();

    private url: string = 'https://arcademindangsec18-default-rtdb.firebaseio.com/posts.json';

    constructor(private http: HttpClient) { }

    createAndStorePost(title: string, content: string) {
        // Send Http request
        //console.log(postData);

        const postData: Post = {
            title: title,
            content: content
        }
        this.http
            .post<{ name: string }>(
                this.url,
                postData,
                {
                    // response give u access to everything about the response(header, res) and body
                    observe: 'response',
                    responseType: 'json'
                }
            ).subscribe(responseData => {
                console.log(responseData);
            }, error => {
                this.error.next(error.message);
            });
    }

    fetchPosts() {
        // Note create subject if we are observing serveral objects

        let searchParams = new HttpParams();
        // prints response in pretty way, does not matter in this project
        searchParams = searchParams.append('print', 'pretty');
        // custom key does nothing
        searchParams = searchParams.append('custom', 'key');

        // give it a response type to avoid typescript errors
        return this.http.get<{ [key: string]: Post }>(
            this.url,
            {
                headers: new HttpHeaders({ "Custom-header": 'hello' }),
                params: searchParams,
                responseType: 'json'
            }
        )
            .pipe(
                map((responseData) => {
                    const postsArray: Post[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            postsArray.push({ ...responseData[key], id: key });
                        }
                    }
                    return postsArray;
                }),
                catchError(errorRes => {
                    // Send to analytic server
                    return throwError(errorRes)
                })
            );
    }

    deletePosts() {
        return this.http.delete(
            this.url,
            {
                // events are
                observe: 'events',
                responseType: 'text'
            }
        ).pipe(
            tap(
                event => {
                    console.log(event);
                    if(event.type === HttpEventType.Sent){
                        // here we can send to ui event was sent
                    }
                    if(event.type === HttpEventType.Response){
                        console.log(event.body);
                    }
                }
        ));
    }
}