import { Component, Version } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayersService } from '../services/players.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-box-player',
  templateUrl: './box-player.component.html',
  styleUrls: ['./box-player.component.css?v='],
})
export class BoxPlayerComponent {


  newPlayerInput: string;
  maxPlayerAlert = false;
  playerList = [];

  constructor(private router: Router,
    private playersSerivce: PlayersService) {
    this.playersSerivce.getPlayerListObs().subscribe(players => {
      this.playerList = players;
      this.validateMaxPlayers();
    })
  }

  addPlayer() {
    this.playersSerivce.addPlayer(this.newPlayerInput)
    this.newPlayerInput = ''
    this.validateMaxPlayers();
  }



removePlayer(player){
  this.playersSerivce.removePlayer(player)
  this.validateMaxPlayers();
}

validateMaxPlayers(){
  this.maxPlayerAlert = this.playerList.length >= 8
}

}

