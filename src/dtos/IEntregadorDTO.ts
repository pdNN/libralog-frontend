export type IUpdateEntregadorDTO = {
  cod_entregador: number;
  nome_entregador?: string;
  des_endereco?: string;
  nr_endereco?: string;
  des_bairro?: string;
  des_cidade?: string;
  nr_cep?: string;
  nr_telefone?: string;
  cod_cpf?: string;
  cod_cnh?: string;
  des_email?: string;
};

export type ICreateEntregadorDTO = {
  nome_entregador: string;
  des_endereco: string;
  nr_endereco: string;
  des_bairro: string;
  des_cidade: string;
  nr_cep: string;
  nr_telefone: string;
  cod_cpf: string;
  cod_cnh: string;
  des_email: string;
};

export type IEntregadorDTO = {
  cod_entregador: number;
  nome_entregador: string;
  des_endereco: string;
  nr_endereco: string;
  des_bairro: string;
  des_cidade: string;
  nr_cep: string;
  nr_telefone: string;
  cod_cpf: string;
  cod_cnh: string;
  des_email: string;
  dthr_criacao: Date;
  dthr_atualizacao: Date;
};
