import { PrismaService } from 'src/database/PrismaService';

interface propsType {
  module: string;
  busca: string;
  pagina: number;
  itensPorPagina: number;
  queries?: Object;
  include?: Object;
  buscaPor?: Object;
  ordenacao?: Object;
}

export default async function paginate({
  module,
  busca,
  pagina,
  itensPorPagina,
  queries,
  include,
  buscaPor,
  ordenacao,
}: propsType) {
  const prisma = new PrismaService();
  const skip = Number(itensPorPagina * (pagina - 1));

  let query = {};

  if (busca) {
    if (buscaPor) {
      query = Object.assign(query, buscaPor);
    } else {
      query = Object.assign(query, {
        nome: {
          contains: busca,
          mode: 'insensitive',
        },
      });
    }
  } //fim do if busca

  if (queries) {
    query = Object.assign(query, queries);
  }

  const totalItens = await prisma[module].count({
    ...(Object.keys(query).length > 0 && { where: query }),
    where: {
      ...query,
    },
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
      skip: busca ? 0 : skip,
      take: Number(itensPorPagina),
      orderBy: ordenacao && ordenacao,
      include,
    });

    const maxPagRaw = Number(totalItens / itensPorPagina);
    const maxPaginas = Math.ceil(maxPagRaw);

    return {
      data: itens,
      maxPage: maxPaginas,
    };
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
}
