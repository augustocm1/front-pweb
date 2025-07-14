import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DisciplinasService } from 'src/app/disciplinas.service';
import { ProfessoresService } from 'src/app/professores.service';
import { Disciplina } from '../shared/dtos/disciplina';
import { DisciplinaTable } from '../shared/dtos/disciplinaTable';

@Component({
  selector: 'app-disciplinas-list',
  templateUrl: './disciplinas-list.component.html',
  styleUrls: ['./disciplinas-list.component.css']
})
export class DisciplinasListComponent implements OnInit {

  disciplinas: Array<DisciplinaTable> = [];
  disciplina?: Disciplina;
  message: string;

  success = false;
  notSuccess = false;
  constructor(
    private _disciplinaService: DisciplinasService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getTeachers();
  }

  getTeachers() {
    this._disciplinaService.findAll()
      .subscribe(res => {
        this.disciplinas = res;
        console.log(this.disciplinas)
      }, error => {
        console.log(error);
      });
  }

  newTeacher() {
    this._router.navigate(['/layout/disciplinas-form']);
  }

  startDelete(disciplina: Disciplina) {
    this.disciplina = disciplina;
  }

  cancelDelete() {
    this.disciplina = undefined;
  }

  finishDelete() {
    this._disciplinaService.deleteById(this.disciplina.id)
    .subscribe(res => {
      this.message = 'Disciplina deletada com sucesso!';
      this.success = true;
      this.ngOnInit();
    }, error => {
      this.message = 'Não foi possivel deletar esta disciplina!'
      this.notSuccess = true;
    });
  }
}
