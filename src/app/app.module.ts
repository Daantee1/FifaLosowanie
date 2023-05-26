import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BoxPlayerComponent } from './box-player/box-player.component';
import { FormsModule } from '@angular/forms';
import { BanPickComponent } from './ban-pick/ban-pick.component';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { PlayersService } from './services/players.service';
import { ClubsService } from './services/clubs.service';
import { PickedbannedService } from './services/pickedbanned.service';
import { PickSelectComponent } from './pick-select/pick-select.component';
import { RouletteSelectComponent } from './roulette-select/roulette-select.component';

@NgModule({
  declarations: [
    AppComponent,
    BoxPlayerComponent,
    BanPickComponent,
    PickSelectComponent,
    RouletteSelectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PlayersService, ClubsService, PickedbannedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
