import { Pessoa } from "./Pessoa";

export type Periodo = {
  id?: number;
  mes: Date;
  inicio: Date;
  fim?: Date;
  valorAtual: number;
  isFechado: boolean;
  valorTotal?: number;
  pagadores: Pessoa[];
};
