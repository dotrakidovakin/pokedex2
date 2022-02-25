import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {PagedData} from "./model/paged-data";
import {Pokemon} from "./model/pokemon";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  private pokemonApiUrl = "http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io";

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getPokemons() : Observable<PagedData<Pokemon>>{
    return this.http.get<PagedData<Pokemon>>(this.pokemonApiUrl+"/pokemons?offset=0&limit=15").pipe(
      catchError(this.handleError<PagedData<Pokemon>>('getPokemons', {} as PagedData<Pokemon>))
    )
  }

  getPokemon(id: number) : Observable<Pokemon>{
    return this.http.get<Pokemon>(this.pokemonApiUrl+"/pokemons/"+id).pipe(
      catchError(this.handleError<Pokemon>('getPokemon', {} as Pokemon))
    )
  }

  getPokemonsOnScroll(offset: number, limit: number): Observable<PagedData<Pokemon>>{
    return this.http.get<PagedData<Pokemon>>(this.pokemonApiUrl+"/pokemons?offset="+offset+"&limit="+limit).pipe(
      catchError(this.handleError<PagedData<Pokemon>>('getPokemons', {} as PagedData<Pokemon>))
    )
  }

}
