import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DisciplinasFormComponent } from './disciplinas/disciplinas-form/disciplinas-form.component';
import { DisciplinasListComponent } from './disciplinas/disciplinas-list/disciplinas-list.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { ProfessoresFormComponent } from './professores/professores-form/professores-form.component';
import { ProfessoresListComponent } from './professores/professores-list/professores-list.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'professores-form',
        component: ProfessoresFormComponent
      },
      {
        path: 'professores-form/:id',
        component: ProfessoresFormComponent
      },
      {
        path: 'professores-list',
        component: ProfessoresListComponent
      },
      {
        path: 'disciplinas-form',
        component: DisciplinasFormComponent
      },
      {
        path: 'disciplinas-form/:id',
        component: DisciplinasFormComponent
      },
      {
        path: 'disciplinas-list',
        component: DisciplinasListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
