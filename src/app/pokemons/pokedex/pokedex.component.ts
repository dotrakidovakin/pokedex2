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
    console.log(id);
    this.pokeid = id;
    //this.newItemEvent.emit(id);


  }

  idtochange(id : number){
    this.pokeAInclure = id;
    this.pokeid = undefined;
    console.log("Dans idtochange, id vaut : " + this.pokeAInclure);
    
  }

  onRetour(){
    this.pokeid = undefined;
  }

  ngOnInit(): void {
  }

  opened(): void {
    console.log("ok");
    
  }

}
