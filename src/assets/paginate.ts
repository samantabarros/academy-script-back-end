import { PrismaService } from 'src/database/PrismaService';

/* Interface que descreve a estrutura esperada do objeto que a função 'paginate'
 * aceitará como argumento */
interface propsType {
  module: string;
  itensPorPagina: number;
  pagina: number;
  busca: string;
  querys?: string;
  include?: string;
}

/* Função paginate que aceita um objeto com as propriedades especificadas
 * pela interface 'propsType' */
export default async function paginate({
  module,
  itensPorPagina,
  pagina,
  busca,
  querys,
  include,
}: propsType) {
  //Criação da instância do PrismaService
  const prisma = new PrismaService();

  /* Cálculo do valor da variável skip: calcula o número de itens que devem
   * ser ignorados ao realizar a paginação com base na página atual e na
   * quantidade de itens por página
   */
  const skip = Number(itensPorPagina * (pagina - 1));
  console.log("O valor de skip é "+ skip);


  /*Inicialização da variável query como um objeto vazio que será usado para
   * construir as condições de consulta
   */
  let query = {};

  /* Condição de busca - se a propriedade busca estiver presente, adiciona uma condição à query
   * para buscar registros onde o nome contém a string especificada, sendo case-insensitive
   */
  if (busca) {
    query = Object.assign(query, {
      nome_aluno: {
        contains: busca,
        mode: 'insensitive',
      },
    });
  }

  //Condições adicionais - adiciona condições adicionais a query com base em um array de queries
  if (querys) {
    query = Object.assign(query, querys);
  }
  console.log("query:" + query);
  console.log("querys:" + querys);

  /* Usa o Prisma  para contar o total de itens no banco de dados, considerando as condições especificadas na 'query'
   * prisma[module] -> prisma[aluno].count -> prisma.aluno.count
   */
  const totalItens = await prisma[module].count({
    // ...(Object.keys(query).length > 0 && { where: query }),
    where: query,
  });

  //await prisma.alunos.count
  //Se não há itens, retorna um objeto indicando que não há dados para mostrar
  if (totalItens === 0) {
    return {
      data: [],
      maxPage: 0,
    };
  }

  /* Recuperação dos itens paginados
   * Recupera os itens paginados do banco de dados usando o Prisma, considerando as condições e a ordenação especificadas.
   */

  /* [module] ->  A propriedade 'module' é uma string passada como argumento para a função paginate. Ela representa a entidade
   *  ou tabela do banco de dados da qual se deseja recuperar os dados. Se 'module' for 'User', a consulta será feita na tabela
   * de usuários
   */

  /*
   *findMany -> recupera vários registros que atendem a determinadas condições
   */
  try {
    const itens = await prisma[module].findMany({
      //where -> Objeto que contém as condições de consulta
      // ...(Object.keys(query).length > 0 && { where: query }),
      where: query,

      /*skip -> número de itens que a consulta deve ignorar antes de começar a recuperar dados. Isso é calculado com base no
       * número da página e na quantidade de itens por página
       */
      skip: skip > 0 ? skip : 0,

      /* take -> número máximo de itens a serem recuperados pela consulta. Isso é determinado pela quantidade de itens por página
       * definida
       */
      //take: Number(itensPorPagina),
      take: itensPorPagina > 0 ? itensPorPagina : 1,

      //Define a ordenação dos resultados. Os resultados são ordenados em ordem crescente com base na propriedade 'createdAt'

      orderBy: {
        nome_aluno: 'asc',
      },

      /*include -> Uma opção para incluir os dados relacionados na consulta. Uma parte dessa função usa um operador lógico '&&'
       * para verificar se 'include' está definido antes de incluir dados relacionados.
       * Se 'include' estiver definido, o objeto incluído na consulta será '{[include] : true'} indicando que os dados relacionados
       * especificados por 'include' devem ser incluídos na resposta da consulta
       */
      //include: include && { [include]: true },
      ...(include && { include: { [include]: true } }),
    });

    /* Calcula o número máximo de páginas ('maxPaginas), arrendondando para cima para garantir que
     * todos os itens sejam exibidos
     */
    const maxPagRaw = Number(totalItens / itensPorPagina);
    const maxPaginas = Math.ceil(maxPagRaw);
  
    console.log("O valor de itensPorPagina é " + itensPorPagina);
    console.log("O valor de totalItens é " + totalItens);
    console.log("O valor de maxPagRaw é " + maxPagRaw);
    console.log("O valor de maxPaginas é " + maxPaginas);

    //Retorno dos dados paginados
    /* Retorna um objeto contendo os itens paginados ('data') e o número máximo de páginas. Se ocorrer um erro durante a execução,
     * o código captura e loga o erro antes de lançá-lo novamente
     */
    return {
      data: itens,
      maxPage: maxPaginas,
    };
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
}
