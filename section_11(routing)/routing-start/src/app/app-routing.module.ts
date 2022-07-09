import { NgModule } from "@angular/core";
import { Routes, Router, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerResolver } from "./servers/server/server-resolver.service";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

const appRoutes: Routes= [
    { path: '', component: HomeComponent},
    { path: 'users', component: UsersComponent, children: [
        // to send dinamic data use ":id"
      { path: ':id/:name', component: UserComponent }
    ]},
    
    { 
      path: 'servers', 
      //canActivate: [AuthGuard], 
      canActivateChild: [AuthGuard],
      component: ServersComponent, 
      children: [
      { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },
      { path: ':id/edit', canDeactivate: [CanDeactivateGuard], component: EditServerComponent} 
    ]},
    // { path: 'not-found', component: PageNotFoundComponent },
    { path: 'not-found', component: ErrorPageComponent , data: {message: 'Page not found!'}},
    // must be last always because it will redirect path
    { path: '**', redirectTo: '/not-found' }
  ];

@NgModule({
    imports: [
      // hash mode, will look after the # tag when routing. should be added when deployed 
      //  RouterModule.forRoot(appRoutes, {useHash: true})

      RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{
    
}