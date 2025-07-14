import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component';
import { DisciplinasModule } from './disciplinas/disciplinas.module';
import { ProfessoresModule } from './professores/professores.module';
import { ProfessoresFormComponent } from './professores/professores-form/professores-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfessoresService } from './professores.service';
import { DisciplinasService } from './disciplinas.service';
import { ProfessoresListComponent } from './professores/professores-list/professores-list.component';
import { DisciplinasListComponent } from './disciplinas/disciplinas-list/disciplinas-list.component';
import { DisciplinasFormComponent } from './disciplinas/disciplinas-form/disciplinas-form.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    TemplateModule,
    FormsModule,
    HttpClientModule,
    DisciplinasModule,
    ProfessoresModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    ProfessoresService,
    DisciplinasService,
    AuthService
  ],
  bootstrap: [
    AppComponent,
    ProfessoresFormComponent,
    ProfessoresListComponent,
    DisciplinasFormComponent,
    DisciplinasListComponent
  ]
})
export class AppModule { }
