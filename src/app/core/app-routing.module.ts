import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AuthGuard } from '../auth/auth.guard';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NoteCreateComponent } from '../notes/create/note-create/note-create.component';
import { NoteListComponent } from '../notes/create/note-list/note-list.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent ,
    canActivate: [AuthGuard],
    children: [
      { path: 'create-note', component: NoteCreateComponent},
      { path: 'note-list', component: NoteListComponent}
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
