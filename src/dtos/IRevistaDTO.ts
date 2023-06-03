export type IUpdateRevistaDTO = {
  cod_revista: number;
  nome_revista?: string;
  nr_isbn?: number;
};

export type ICreateRevistaDTO = {
  nome_revista: string;
  nr_isbn?: number;
};

export type IRevistaDTO = {
  cod_banca: number;
  nome_banca: string;
  nr_isbn?: number;
  dthr_criacao: Date;
  dthr_atualizacao: Date;
};
