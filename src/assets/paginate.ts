import { PrismaService } from 'src/database/PrismaService';

/* Interface que descreve a estrutura esperada do objeto que a função 'paginate'
 * aceitará como argumento */
interface propsType {
  module: string;
  busca: string;
  pagina: number;
  itensPorPagina: number;
  querys?: Object;
  include?: string;
}

/* Função paginate que aceita um objeto com as propriedades especificadas
 * pela interface 'propsType' */
export default async function paginate({
  module,
  busca,
  pagina,
  itensPorPagina,
  querys,
  include,
}: propsType) {
  //Criação da instância do PrismaService
  const prisma = new PrismaService();
  /* Cálculo do valor da variável skip: calcula o número de itens que devem
   * ser ignorados ao realizar a paginação com com base na página atual e na
   * quantidade de itens por página
   */
  const skip = Number(itensPorPagina * (pagina - 1));

  /*Inicialização da variável query como um objeto vazio que será usado para
   * construir as condições de consulta
   */
  let query = {};

  /* Condição de busca - se a propriedade busca estiver presente, adiciona uma condição à query
   * para buscar registros onde o nome contém a string especificada, sendo case-insensitive
   */
  if (busca) {
    query = Object.assign(query, {
      nome: {
        contains: busca,
        mode: 'insensitive',
      },
    });
  }

  //Condições adicionais - adiciona condições adicionais a query com base em um array de queries
  if (querys) {
      query = Object.assign(querys);
  }

  // Usa o Prisma  para contar o total de itens no banco de dados, considerando as condições especificadas na 'query'
  const totalItens = await prisma[module].count({
    where: query,
  });

  //Se não há itens, retorna um objeto indicando que não há dados para mostrar
  if (totalItens === 0) {
    return {
      data: [],
      maxPag: 0,
    };
  }

  //Recuperação dos itens paginados
  try {
    const itens = await prisma[module].findMany({
        where: query,
        skip, 
        take: Number(itensPorPagina),
        orderBV: {
            createdAt: 'asc',
        },
        include: include && {
            [include]: true,
        },
    });

    /* Calcula o número máximo de páginas ('maxPaginas), arrendondando para cima para garantir que 
     * todos os itens sejam exibidos
     */
    const maxPagRaw = Number(totalItens / itensPorPagina);
    const maxPaginas = Math.ceil(maxPagRaw);

    return {
        data: itens,
        maxPag: maxPaginas,
    };
  } catch (error) {
    console.log(error.message);
    throw new Error (error);
  }
}
