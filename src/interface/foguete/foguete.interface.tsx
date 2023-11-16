export interface IFoguete {
  id?: number;
  nome?: string;
  material?: string;
  placeHolderApagar?: string;
  placeHolderEditar?: string;
}
/* const getAll = assync (): Promise<IFoguete | ApiException> =>{
  try{
    const {data} = await Api().get('/foguete');
    return data;  

  }catch(error: any){
    return new ApiException(error.message || 'Erro ao pesquisar o Foguete')
  }

}

const getById = assync (id:number): Promise<IFoguete | ApiException> =>{
  try{
    const {data} = await Api().get(`/foguete/${id}`);
    return data;  

  }catch(error: any){
    return new ApiException(error.message || 'Erro ao pesquisar o Foguete')
  }

}

const deleteById = assync (id:number): Promise<IFoguete | ApiException> =>{
  try{
    const {data} = await Api().delete(`/foguete/${id}`);
    return undefined;  

  }catch(error: any){
    return new ApiException(error.message || 'Erro ao deletar o Foguete')
  }

}

export const Foguete = {
    getAll,
    getById,
    deleteById
} */
