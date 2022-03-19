import { Component, OnInit, Output, EventEmitter, Input  } from '@angular/core';
import {PokemonService} from "../pokemon.service";
import {PagedData} from "../model/paged-data";
import {Pokemon} from "../model/pokemon";
import { forkJoin, map, Observable, of } from 'rxjs';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  dataPokemons?: PagedData<Pokemon>
  dataPokemonsTeam?: Pokemon[];
  listSearch?: string;
  datastruct?: any;
  access_token?: string;
  //nbequipe?: number;
  compoEquipe?: number[];
  txtBtn?: String;
  Inpokedex?: boolean;
  saveSearch = "";

  @Output() swapDetector = new EventEmitter<boolean>();
  @Output() newItemEvent = new EventEmitter<number>();
  @Input() pokeAInclure?: number;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.txtBtn = "Mon Equipe";
    this.pokemonService.settxtBtn("Mon Equipe");
    this.Inpokedex = true;
    
    this.getPokemonsFromService();
    this.authconnexion();
  }

  public selectPok(id: number) {
    this.newItemEvent.emit(id);
  }

  public authconnexion(): void {
    //this.access_token = this.pokemonService.Authconnexion();
    this.pokemonService.Authconnexion().subscribe(data => {
      //console.log(data);
      
      this.datastruct = data;
      this.access_token = this.datastruct!.access_token;
      
      //On récupére ensuite l'équipe
      this.pokemonService.RecupEquipe(this.access_token!).subscribe(data => {
        console.log(data);
        this.pokemonService.setnbEquipe(data.length);
        this.pokemonService.setcompoEquipe(data);
        this.compoEquipe = data;
        console.log("Il y a les pokemons " + this.pokemonService.getnbEquipe() + " dans mon équipe");
          
     })
    })    
  }

  /**
   * Si un changement est detecté sur pokeAIclure
   */
  ngOnChanges(): void {
    if(this.pokeAInclure){
      //console.log("Dans ngonChange, this.pokeAInclure vaut : " + this.pokeAInclure);
      
      this.onChange(this.pokeAInclure);
      this.pokeAInclure = undefined;
    }
  }

  onChange(idAInclure : number): void {
    let val  = this.pokemonService.gettxtBtn();
    if(val === "Le pokedex"){
      
      this.pokemonService.supprimerPokemon([idAInclure]);

      this.switchPoke();
      return;
    } 
  }

  

  public switchPoke(){

    if(this.pokemonService.compoEquipe && (this.pokemonService.compoEquipe.length >= 1)){    
      const pokemonObservable : Observable<Pokemon>[] = this.compoEquipe!.map(id => 
        this.pokemonService.getPokemon(id)
     );     
     forkJoin(
      pokemonObservable
    ).pipe(
      map((pokemons) =>  {
        this.dataPokemonsTeam = pokemons;        
        }
      )
    ).subscribe(() =>
      this.dataPokemons = { data : this.dataPokemonsTeam??[] } as PagedData<Pokemon>
    );
    }
    else {
      this.dataPokemons = undefined
    }
    
    this.pokemonService.settxtBtn("Le pokedex");
    this.txtBtn = "Le pokedex";
    this.Inpokedex = false;
  }

  public switchTeam(){

    this.getPokemonsFromService();
    this.pokemonService.settxtBtn("Mon Equipe");
    this.txtBtn = "Mon Equipe";
    this.Inpokedex = true;
  }
  
  /**
   * Déclanché sur par un click sur le bouton servant à naviger entre la team et le pokedex,
   * appelle ensuite la méthode switchPoke si la valeur de txtBtn dans pokemon service vaut "Mon Equipe"
   * sinon elle appelle la méthode switchTeam 
   */
  public switchMP(){
    this.swapDetector.emit(true);
    const val = this.pokemonService.gettxtBtn()
    
    if(val as unknown as string === "Mon Equipe"){
      
      this.switchPoke();
    }
    else {this.switchTeam();}
  }
    

  /*switchEquipe(){
    //console.log(this.access_token);
    this.pokemonService.AjouterPokemon([3,6,7,2], this.access_token!).subscribe(() =>
       this.pokemonService.RecupEquipe(this.access_token!).subscribe(data => {
          console.log(data);
      
       })
    );

  }*/

  private getPokemonsFromService(): void {
    this.pokemonService.getPokemons().subscribe(data =>{
        this.dataPokemons = data;
        this.dataPokemons!.offset += this.dataPokemons!.limit;
      }
    )
  }

  private getPokemonsOnScroll(offset: number, limit: number): void {
    
    if(this.saveSearch != "" && this.saveSearch != undefined){      
      
      this.pokemonService.getPokemonsOnScrollSearch(offset,limit,this.saveSearch!).subscribe(data => {
        this.dataPokemons!.data = this.dataPokemons!.data.concat(data.data);
        console.log(this.dataPokemons!.data);
        
        this.dataPokemons!.offset += limit;
        
      })
    }
    else{
      
      this.pokemonService.getPokemonsOnScroll(offset,limit).subscribe(data => {
        this.dataPokemons!.data = this.dataPokemons!.data.concat(data.data);
        this.dataPokemons!.offset += this.dataPokemons!.limit;
      })
    }
    

  }

  public Newletter(search : any) : void {
    this.saveSearch = search;
    if(search == ""){
      this.pokemonService.getPokemons().subscribe(data =>{
        this.dataPokemons = data;
        this.dataPokemons!.offset += this.dataPokemons!.limit;
        return null;
      }
    )
    }
    else{
      this.pokemonService.getSearchPokemon(search).subscribe(
        pokemon => {
          this.dataPokemons = pokemon;
          this.dataPokemons.offset = this.dataPokemons!.limit;
        }
      )
    }
        
  } 

  onScroll(): void  {
    this.getPokemonsOnScroll(this.dataPokemons?.offset as number,15);
  }

  public onSearch(){ }

}


