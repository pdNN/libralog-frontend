export type IUpdateFiscalDTO = {
  cod_documento: number;
  cod_n_nfe?: number;
  nr_quantidade?: number;
  vlr_unitario?: number;
  vlr_total?: number;
  dthr_documento?: Date;
  cod_editora?: number;
  cod_revista?: number;
  cod_movimento?: number;
  cod_entregador?: number;
  cod_banca?: number;
  cod_distribuidora?: number;
};

export type ICreateFiscalDTO = {
  cod_n_nfe: number;
  nr_quantidade: number;
  vlr_unitario: number;
  vlr_total: number;
  dthr_documento: Date;
  cod_editora: number;
  cod_revista: number;
  cod_movimento: number;
  cod_entregador: number;
  cod_banca: number;
  cod_distribuidora: number;
};

export type IFiscalDTO = {
  cod_documento: number;
  cod_n_nfe: number;
  nr_quantidade: number;
  vlr_unitario: number;
  vlr_total: number;
  dthr_documento: Date;
  cod_editora: number;
  cod_revista: number;
  cod_movimento: number;
  cod_entregador: number;
  cod_banca: number;
  cod_distribuidora: number;
  dthr_criacao: Date;
  dthr_atualizacao: Date;
};
