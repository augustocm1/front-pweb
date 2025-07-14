import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfessoresService } from 'src/app/professores.service';
import { Professor } from '../shared/models/dtos/professor';

@Component({
  selector: 'app-professores-list',
  templateUrl: './professores-list.component.html',
  styleUrls: ['./professores-list.component.css']
})
export class ProfessoresListComponent implements OnInit {

  professores: Array<Professor> = [];
  professor?: Professor;
  message: string;

  success = false;
  notSuccess = false;
  constructor(
    private _professorService: ProfessoresService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getTeachers();
  }

  getTeachers() {
    this._professorService.findAll()
      .subscribe(res => {
        this.professores = res;
        console.log(this.professores)
      }, error => {
        console.log(error);
      });
  }

  newTeacher() {
    this._router.navigate(['/layout/professores-form']);
  }

  startDelete(professor: Professor) {
    this.professor = professor;
  }

  cancelDelete() {
    this.professor = undefined;
  }

  finishDelete() {
    this._professorService.deleteById(this.professor.id)
    .subscribe(res => {
      this.message = 'Professor deletado com sucesso!';
      this.success = true;
      this.ngOnInit();
    }, error => {
      this.message = 'Não foi possivel deletar este professor!'
      this.notSuccess = true;
    });
  }
}
