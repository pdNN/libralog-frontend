import { IEditoraDTO } from "./IEditoraDTO";
export type IUpdateRevistaDTO = {
  cod_revista: number;
  nome_revista?: string;
  cod_edicao_revista?: string;
};

export type ICreateRevistaDTO = {
  nome_revista: string;
  cod_edicao_revista: string;
  cod_editora: number;
};

export type IRevistaDTO = {
  cod_revista: number;
  nome_revista: string;
  cod_edicao_revista: string;
  dthr_criacao: Date;
  dthr_atualizacao: Date;
  editora?: IEditoraDTO;
  cod_editora: number;
};
