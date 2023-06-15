import { IUsuarioDTO } from "./IUsuarioDTO";

export type IUpdatePerfilDTO = {
  cod_perfil: number;
  nome_perfil?: string;
  permissoes?: string[];
};

export type ICreatePerfilDTO = {
  nome_perfil: string;
  permissoes?: string[];
};

export type IPerfilDTO = {
  cod_perfil: number;
  nome_perfil: string;
  permissoes: string[];
  dthr_criacao: Date;
  dthr_atualizacao: Date;
  usuarios?: IUsuarioDTO[];
};
