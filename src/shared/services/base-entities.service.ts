export abstract class BaseEntitiesService<EntityConnection> {
  relayPagination = (first: number, after: string) => (entities: any): any => {
    const index = entities.map(m => m.id).indexOf(Number(after)) + 1;
    const totalCount = entities.length;
    const edges = entities.slice(index, index + first).map(m => ({
      cursor: m.id,
      node: { ...m },
    }));
    const lastCursor = edges.length ? edges[edges.length - 1].node.id : null;
    const pageInfo = {
      lastCursor,
      hasNextPage: entities.length + first > lastCursor + first,
    };

    return {
      totalCount,
      pageInfo,
      edges,
    };
  }
}
