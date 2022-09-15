import { Periodo } from "./Periodo";
import { Categoria } from "./Categoria";
import { Pessoa } from "./Pessoa";

export type Despesa = {
  id: number;
  descricao: string;
  dono: Pessoa;
  isDivisivel: boolean;
  pagadores: Pessoa[];
  categoria: Categoria;
  data: Date;
  periodo: Periodo;
  valor: number;
  isPago: boolean;
};
