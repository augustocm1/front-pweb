import { Professor } from "src/app/professores/shared/models/dtos/professor";

export class Disciplina {
  id: number;
  name: string;
  codigo: string;
  description: string;
  teacher: Professor;
  moment: string;
  status: string;
}
