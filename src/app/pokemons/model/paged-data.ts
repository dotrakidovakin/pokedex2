import { Pokemon } from "./pokemon";

export interface PagedData<T> {
    data: Pokemon[];
    limit: number;
    offset: number;
  }