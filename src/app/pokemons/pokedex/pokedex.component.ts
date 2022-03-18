import { Component, OnInit, EventEmitter } from '@angular/core';
import {PokemonService} from "../pokemon.service";
import {PagedData} from "../model/paged-data";
import {Pokemon} from "../model/pokemon";
import {ActivatedRoute} from "@angular/router";
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  events = [];
  pokeid?: number;
  pokeAInclure?: number;
  constructor() { }

  onChange(id : any) {
    this.pokeid = id;
  }

  onswap(){
    this.pokeid = undefined;
  }

  idtochange(id : number){
    this.pokeAInclure = id;
    this.pokeid = undefined;
  }

  onRetour(){
    this.pokeid = undefined;
  }

  ngOnInit(): void {
  }

  opened(): void {
  }

}
