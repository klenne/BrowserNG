export interface Service<T, V> {
  run(request: T): Promise<V>;
}
