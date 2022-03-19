import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {PokemonService} from "../pokemon.service";
import {ActivatedRoute} from "@angular/router";
import {Pokemon} from "../model/pokemon";
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, OnChanges {

  @Input() pokeid?: number;
  @Output() retour = new EventEmitter();

  @Output() idReturn = new EventEmitter<number>();

  @Input() dataPokemon ?: Pokemon;
  constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private location: Location) { }

  etat: string = "Supprimer";

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.pokeid){
      this.onChange(this.pokeid);
      if(this.pokemonService.gettxtBtn() === "Mon Equipe") {
        this.etat = "Ajouter";
      }
      else this.etat = "Supprimer";
    }
  }

  public onChange(id : any){
    this.pokemonService.getPokemon(id).subscribe(data =>{
      this.dataPokemon = data;
      
      
    })
  }

  goBack(): void {
    this.retour.emit();
  }

  /**
   * Si on est dans le cas d'un ajout de pokemon on appelle directement la méthode dans pokemonservice.
   * Sinon on renvoie l'id au pokedex qui le transfere à pokemon list. Et on désafiche le pokémon 
   * @param id 
   */
  ajouterSupprimer(id: number) : void {
    if(this.pokemonService.gettxtBtn() === "Mon Equipe"){
      this.pokemonService.AjouterPokemon([id]);
      return;
    }
      
    this.idReturn.emit(id);

  }


  playSound(id ?: number) {
    let audio = new Audio();
    audio.src = `../assets/audio/${id}.mp3`
    audio.load();
    audio.play();
  }
}
