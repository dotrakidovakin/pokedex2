import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PokemonsModule} from './pokemons/pokemons.module';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PokemonsModule,
    HttpClientModule,
    RouterModule,
    MatToolbarModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
