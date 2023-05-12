import { IUsuarioDTO } from "./IUsuarioDTO";

export type IUpdateDistribuidoraDTO = {
  cod_distribuidora: number;
  nome_distribuidora?: string;
  qtd_licencas?: number;
};

export type ICreateDistribuidoraDTO = {
  nome_distribuidora: string;
  qtd_licencas?: number;
};

export type IDistribuidoraDTO = {
  cod_distribuidora: number;
  nome_distribuidora: string;
  qtd_licencas: number;
  dthr_criacao: Date;
  dthr_atualizacao: Date;
  usuarios?: IUsuarioDTO[];
};
