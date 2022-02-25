import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../pokemon.service";
import {PagedData} from "../model/paged-data";
import {Pokemon} from "../model/pokemon";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  dataPokemons?: PagedData<Pokemon>

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemonsFromService();
  }

  private getPokemonsFromService(): void {
    this.pokemonService.getPokemons().subscribe(data =>{
        this.dataPokemons = data;
        this.dataPokemons!.offset += this.dataPokemons!.limit;
      }
    )
  }

  private getPokemonsOnScroll(offset: number, limit: number): void {
    this.pokemonService.getPokemonsOnScroll(offset,limit).subscribe(data => {
      this.dataPokemons!.data = this.dataPokemons!.data.concat(data.data);
      this.dataPokemons!.offset += this.dataPokemons!.limit;
    })

  }

  onScroll(): void  {
    this.getPokemonsOnScroll(this.dataPokemons?.offset as number,15);
  }

}
