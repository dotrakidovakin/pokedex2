import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../pokemon.service";
import {ActivatedRoute} from "@angular/router";
import {Pokemon} from "../model/pokemon";
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  dataPokemon ?: Pokemon;
  constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.getPokemonFromService();
  }

  private getPokemonFromService():void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemonService.getPokemon(id).subscribe(data =>{
        this.dataPokemon = data;
        console.log(data);
      }
    )
  }

  goBack(): void {
    this.location.back();
  }


  playSound(id ?: number) {
    let audio = new Audio();
    audio.src = `../assets/audio/${id}.mp3`
    audio.load();
    audio.play();
  }
}
