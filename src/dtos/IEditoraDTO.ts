export type IUpdateEditoraDTO = {
  cod_editora: number;
  nome_editora?: string;
  des_razao_social?: string;
  des_contato?: string;
  des_endereco?: string;
  nr_endereco?: string;
  des_bairro?: string;
  des_cidade?: string;
  nr_cep?: string;
  nr_telefone?: string;
  cod_cnpj?: string;
  cod_insc_estadual?: string;
  des_email?: string;
};

export type ICreateEditoraDTO = {
  nome_editora?: string;
  des_razao_social: string;
  des_contato: string;
  des_endereco: string;
  nr_endereco: string;
  des_bairro: string;
  des_cidade: string;
  nr_cep: string;
  nr_telefone: string;
  cod_cnpj: string;
  cod_insc_estadual: string;
  des_email: string;
};

export type IEditoraDTO = {
  cod_editora: number;
  nome_editora?: string;
  des_razao_social: string;
  des_contato: string;
  des_endereco: string;
  nr_endereco: string;
  des_bairro: string;
  des_cidade: string;
  nr_cep: string;
  nr_telefone: string;
  cod_cnpj: string;
  cod_insc_estadual: string;
  des_email: string;
  dthr_criacao: Date;
  dthr_atualizacao: Date;
};
