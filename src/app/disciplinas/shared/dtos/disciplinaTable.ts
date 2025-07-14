import { Professor } from "src/app/professores/shared/models/dtos/professor";

export class DisciplinaTable {
  id: number;
  name: string;
  codigo: string;
  description: string;
  teacher: Professor;
  moment: string;
  status: string;
}
