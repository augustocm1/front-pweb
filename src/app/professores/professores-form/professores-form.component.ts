import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfessoresService } from 'src/app/professores.service';
import { Professor } from '../shared/models/dtos/professor';

@Component({
  selector: 'app-professores-form',
  templateUrl: './professores-form.component.html',
  styleUrls: ['./professores-form.component.css']
})
export class ProfessoresFormComponent implements OnInit {

  teacherForm = new FormGroup({
    inputNome: new FormControl('', Validators.required),
    inputEmail: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    inputRG: new FormControl('', Validators.required),
    inputCPF: new FormControl('', Validators.required),
    inputTelefone: new FormControl('', Validators.required),
    inputEndereco: new FormControl('', Validators.required),
    inputCidade: new FormControl('', Validators.required),
    inputEstado: new FormControl('', Validators.required),
    inputCep: new FormControl('', Validators.required)
  });
  message?: string;
  messageInfo?: string;
  success = false;
  updated = false;
  id?: number;
  professor?: Professor;

  constructor(
    private _professorService: ProfessoresService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    let id = this._activatedRoute.snapshot.params['id'];
    if (id) {
      console.log(id);
      this._professorService.findById(id)
        .subscribe(res => {
          this.id = Number(res.id);
          this.updated = true;
          this.loadForm(res);
        }, error => console.log(error));

      this.messageInfo = 'Atualizando';
    } else {
      this.messageInfo = 'Cadastrando';
    }
  }

  loadForm(teacher: Professor) {
    this.teacherForm = this._formBuilder.group({
      inputNome: new FormControl(teacher.name, Validators.required),
      inputEmail: new FormControl(teacher.email, [
        Validators.email,
        Validators.required
      ]),
      inputRG: new FormControl(teacher.rg, Validators.required),
      inputCPF: new FormControl(teacher.cpf, Validators.required),
      inputTelefone: new FormControl(teacher.phone, Validators.required),
      inputEndereco: new FormControl(teacher.address, Validators.required),
      inputCidade: new FormControl(teacher.city, Validators.required),
      inputEstado: new FormControl(teacher.state, Validators.required),
      inputCep: new FormControl(teacher.zip, Validators.required)
    });
  }

  onSubmit() {
    this.professor = new Professor();

    this.professor.name = this.teacherForm.get('inputNome').value;
    this.professor.email = this.teacherForm.get('inputEmail').value;
    this.professor.rg = this.teacherForm.get('inputRG').value;
    this.professor.cpf = this.teacherForm.get('inputCPF').value;
    this.professor.phone = this.teacherForm.get('inputTelefone').value;
    this.professor.address = this.teacherForm.get('inputEndereco').value;
    this.professor.city = this.teacherForm.get('inputCidade').value;
    this.professor.state = this.teacherForm.get('inputEstado').value;
    this.professor.zip = this.teacherForm.get('inputCep').value;

    if (this.updated) {
      this._professorService.update(this.professor, this.id)
        .subscribe(res => {
          this.success = true;
          this.message = 'Professor atualizado com sucesso!'
          this.teacherForm.reset();
        }, error => {
          console.log(error);
        });
    } else {
      this._professorService.save(this.professor)
        .subscribe(res => {
          this.success = true;
          this.teacherForm.reset();
          this.message = 'Professor cadastrado com sucesso!'
        }, error => {
          console.log(error);
        });
    }
  }

  get registerFormControl() {
    return this.teacherForm.controls;
  }

  backList() {
    this._router.navigate(['/layout/professores-list']);
  }
}
