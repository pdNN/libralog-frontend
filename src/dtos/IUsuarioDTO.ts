import { IDistribuidoraDTO } from "./IDistribuidoraDTO";

export type IUpdateUsuarioDTO = {
  cod_usuario: number;
  nome_usuario?: string;
  email_usuario?: string;
  cod_perfil?: number;
  des_perfil?: string;
  cod_distribuidora?: number;
};

export type ICreateUsuarioDTO = {
  nome_usuario: string;
  email_usuario: string;
  des_senha: string;
  cod_perfil?: number;
  des_perfil?: string;
  cod_distribuidora: number;
};

export type IUsuarioDTO = {
  cod_usuario: number;
  nome_usuario: string;
  email_usuario: string;
  des_senha?: string;
  cod_perfil: number;
  des_perfil: string;
  dthr_criacao: Date;
  dthr_atualizacao: Date;
  distribuidora?: IDistribuidoraDTO;
  cod_distribuidora: number;
};
