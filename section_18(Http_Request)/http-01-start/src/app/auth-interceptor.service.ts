import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { map, tap } from "rxjs/operators";


export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler){
        // here we can have an if, if we do no want to use the interceptor

        // to see request that interceptor ran for
        //console.log(req.url);
        // we modify request if need
        const modifiedRequest = req.clone({
            headers: req.headers.append('Auth', 'xyz')
        });

        // let the request leave the app
        // forward modified request.
        return next.handle(modifiedRequest);
        // .pipe(
        //     tap(event =>{
        //         // log all events
        //         console.log(event);
        //         if(event.type === HttpEventType.Response){
        //             console.log('Response arrived, body data');
        //             console.log(event.body);
        //         }
        //     })
        // );
    }
}