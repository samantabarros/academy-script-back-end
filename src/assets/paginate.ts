import { PrismaService } from 'src/database/PrismaService';

interface propsType {
  module: string;
  busca: string;
  pagina: number;
  itensPorPagina: number;
  queries?: string;
  include?: string;
  buscaPor?:string;
}

export default async function paginate({
  module,
  busca,
  pagina,
  itensPorPagina,
  queries,
  include,
  buscaPor,
}: propsType) {

  const prisma = new PrismaService();
  const skip = Number(itensPorPagina * (pagina - 1));
  console.log("O valor de skip é " + skip + "\n");

  let query = {};
 
  console.log(busca);

  if (busca) {
    if(buscaPor){
      query = Object.assign(query, {
        [buscaPor]: {
          contains: busca,
          mode: 'insensitive',
        },
      });
    }else {
      query = Object.assign(query, {
        nome: {
          contains: busca,
          mode: 'insensitive',
        },
      });
    }
    console.log(query);
  }//fim do if busca

  if (queries) {
    query = Object.assign(query, queries);
  }
  console.log(query);

  
  const totalItens = await prisma[module].count({
    // ...(Object.keys(query).length > 0 && { where: query }),
    where: {
      ...query,
    }
  });

  if (totalItens === 0) {
    return {
      data: [],
      maxPage: 0,
    };
  }

  try {
    const itens = await prisma[module].findMany({
      where: {
        ...query,
      },
      skip: busca ? 0: skip,
      take: Number(itensPorPagina),
      orderBy: {
        [buscaPor]: 'asc',
      },
      // ...(include && { include: { [include]: true } }),
      include,
    });

    const maxPagRaw = Number(totalItens / itensPorPagina);
    const maxPaginas = Math.ceil(maxPagRaw);
    
    console.log("O valor de itensPorPagina é " + itensPorPagina);
    console.log("O valor de totalItens é " + totalItens);
    console.log("O valor de maxPagRaw é " + maxPagRaw);
    console.log("O valor de maxPaginas é " + maxPaginas);
    console.log("O valor de maxPaginas é " + maxPaginas);
    console.log("O valor de skip é: " + skip);

    return {
      data: itens,
      maxPage: maxPaginas,
      
    };     

  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
  
}
