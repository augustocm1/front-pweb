import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DisciplinasService } from 'src/app/disciplinas.service';
import { ProfessoresService } from 'src/app/professores.service';
import { Professor } from 'src/app/professores/shared/models/dtos/professor';
import { Disciplina } from '../shared/dtos/disciplina';
import { DisciplinaCadastro } from '../shared/dtos/disciplinaCadastro';
import { DisciplinaTable } from '../shared/dtos/disciplinaTable';

@Component({
  selector: 'app-disciplinas-form',
  templateUrl: './disciplinas-form.component.html',
  styleUrls: ['./disciplinas-form.component.css']
})
export class DisciplinasFormComponent implements OnInit {

  disciplinaForm = new FormGroup({
    inputNome: new FormControl('', Validators.required),
    inputDescricao: new FormControl('', Validators.required),
    inputTurno: new FormControl('', Validators.required),
    inputProfessor: new FormControl('', Validators.required)
  });

  professores: Array<Professor> = [];
  disciplina?: DisciplinaCadastro;
  message?: string;
  messageInfo?: string;
  success = false;
  updated = false;
  id?: number;

  constructor(
    private _disciplinaService: DisciplinasService,
    private _professorService: ProfessoresService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    let id = this._activatedRoute.snapshot.params['id'];
    if (id) {
      console.log(id);
      this._disciplinaService.findById(id)
        .subscribe(res => {
          this.id = Number(res.id);
          this.updated = true;
          this.loadForm(res);
        }, error => console.log(error));

      this.messageInfo = 'Atualizando';
    } else {
      this.messageInfo = 'Cadastrando';
    }

    this.getTeachers();
  }

  getTeachers() {
    this._professorService.findAll()
      .subscribe(res => {
        this.professores = res;
      }, error => {
        console.log(error);
      });
  }

  loadForm(disciplina: DisciplinaTable) {
    let turno = disciplina.status === 'DIURNO' ? '1': '0';
    this.disciplinaForm = this._formBuilder.group({
      inputNome: new FormControl(disciplina.name, Validators.required),
      inputDescricao: new FormControl(disciplina.description, Validators.required),
      inputTurno: new FormControl(turno, Validators.required),
      inputProfessor: new FormControl(disciplina.teacher, Validators.required)
    });

    console.log(disciplina);
  }

  onSubmit() {
    this.disciplina = new DisciplinaCadastro();

    this.disciplina.name = this.disciplinaForm.get('inputNome').value;
    this.disciplina.description = this.disciplinaForm.get('inputDescricao').value;
    this.disciplina.teacher = this.disciplinaForm.get('inputProfessor').value;
    this.disciplina.status = this.disciplinaForm.get('inputTurno').value;

    if (this.updated) {
      this._disciplinaService.update(this.disciplina, this.id)
        .subscribe(res => {
          this.success = true;
          this.message = 'Disciplina atualizada com sucesso!'
          this.disciplinaForm.reset();
        }, error => {
          console.log(error);
        });
    } else {
      this._disciplinaService.save(this.disciplina)
        .subscribe(res => {
          this.success = true;
          this.disciplinaForm.reset();
          this.message = 'Disciplina cadastrada com sucesso!'
        }, error => {
          console.log(error);
        });
    }


  }

  get registerFormControl() {
    return this.disciplinaForm.controls;
  }

  backList() {
    this._router.navigate(['/layout/disciplinas-list']);
  }
}
