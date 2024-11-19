export interface IArticlesRepository<T> {
  create(title: string, content: string, creatorId: number): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(id: number): Promise<T | null>;
  update(id: number, title: string, content: string): Promise<T>;
  delete(id: number): Promise<T>;
}
