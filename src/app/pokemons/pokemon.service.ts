import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {PagedData} from "./model/paged-data";
import {Pokemon} from "./model/pokemon";
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  nbequipe?: number;
  compoEquipe?: number[];
  txtBtn?: string;
  access_token?: string;
  datastruct?: any;

  constructor(private http: HttpClient) { }

  private pokemonApiUrl = "http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io";

  

  Authconnexion() : Observable<any> {
    const pokemonApiUrl = `${this.pokemonApiUrl}/auth/login`;

    return this.http.post(pokemonApiUrl, {
      email : "pierre.de-saint-meleuc@ig2i.centralelille.fr",
      password : "pierre123"
      }).pipe(
        tap(data => {
          //console.log(data);
          
          this.datastruct = data;
          this.access_token = this.datastruct!.access_token;
          console.log("Nb de pokemon : " + this.nbequipe + " liste des id : " + this.compoEquipe);
        }
      ));
  }

  settxtBtn(val : string){
    this.txtBtn = val;
    console.log(this.txtBtn as unknown as string)    
  }

  gettxtBtn() : string {
    return  this.txtBtn! ;
  }

  setcompoEquipe(tab : number[]){
    this.compoEquipe = tab;
    console.log(this.compoEquipe);
  }

  getcompoEquipe() : number[] {
    return this.compoEquipe!;
  }

  setnbEquipe(tab : number){
    this.nbequipe = tab;
    console.log(this.nbequipe);
  }
  
  getnbEquipe() : number {
    return this.nbequipe!;
  }

  RecupEquipe(access_token : string) : Observable<number[]> {
    const pokemonApiUrl = `${this.pokemonApiUrl}/trainers/me/team`;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}` });
    let options = { headers: headers };
    
    return this.http.get<number[]>(pokemonApiUrl, options).pipe( 
      tap(data => {
        //console.log("les data : " + data);
        //this.nbequipe = data.length;
        //this.compoEquipe = data;
        //console.log("Nb de pokemon : " + this.nbequipe + " liste des id : " + this.compoEquipe);
      })
    ); 
  }

  supprimerPokemon(id : number[]) : boolean {
    if(!this.isinlist || this.nbequipe==0){
      window.alert("Problème");
      return false;
    }
    else {
      console.log("La compoTeam avant la tentative de suppresion : " + this.compoEquipe);
      console.log("Le nbequipe avant : " + this.nbequipe);
      
      const index = this.compoEquipe!.indexOf(id[0], 0);
      if (index > -1) {
      this.compoEquipe!.splice(index, 1);
      }
      console.log("La compoTeam après la tentative de suppresion : " + this.compoEquipe);
      this.nbequipe!--;
      console.log("Le nbequipe après : " + this.nbequipe);
      
      return true;
    }

  }

  AjouterPokemon(id : number[]) : Observable<any> {
    console.log("Il y a x pokemons : x = " + this.nbequipe);
    
    if(this.nbequipe! >=6){
      console.log("Impossible d'ajouter un pokemon l'équipe est pleine");
      alert("L'équipe est déjà pleine !")
      return of();
    }
    
    const pokemonApiUrl = `${this.pokemonApiUrl}/trainers/me/team`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.access_token}`,
      
    });
    let options = { headers: headers };
    this.compoEquipe!.push(id[0]);
    this.nbequipe!++;
    return this.http.put(pokemonApiUrl, this.compoEquipe, options);
    }
    
    public isinlist(id : number): boolean {
      if(this.compoEquipe?.indexOf(id) != -1)
        return true;
      else return false;
    }
    
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
  
    getSearchPokemon(search : string) :Observable<PagedData<Pokemon>>{
      const pokemonApiUrl = `${this.pokemonApiUrl}/pokemons?search=${search}`;
      return this.http.get<PagedData<Pokemon>>(pokemonApiUrl);
    }

  }