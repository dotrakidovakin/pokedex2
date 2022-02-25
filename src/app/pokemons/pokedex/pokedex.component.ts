import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

  opened(): void {
    console.log("ok");
    
  }

}
