import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IClub } from '../models/club';
import { PlayersService } from '../services/players.service';
import { ClubsService } from '../services/clubs.service';
import { HttpClient } from '@angular/common/http';
import { PickedbannedService } from '../services/pickedbanned.service';
@Component({
  selector: 'app-pick-select',
  templateUrl: './pick-select.component.html',
  styleUrls: ['./pick-select.component.css']
})
export class PickSelectComponent {

  firstPickClub: string;
  secondPickClub: string;
  currentDisplayedPlayer: string;
  playerList$: string[] = [];
  clubsData: IClub[] = []
  isShowNextPlayerButtonDisabled = false
  showPlayerListEndMessage = false
  hideBtn = false
  hideBtn2 = false
  hideBtnNext = true

  constructor(private playersSerivce: PlayersService, private clubsService: ClubsService, private pickedbannedService: PickedbannedService
    , private http: HttpClient) {
    this.playersSerivce.getPlayerListObs().subscribe(players => {
      this.playerList$ = players
      if (this.playerList$.length > 0) {
        this.currentDisplayedPlayer = this.playerList$[0]
      }
    })
    this.clubsService.getClubsObs().subscribe(data => 
      this.clubsData = data) 

  }


    


  pickClub(name: string){
    this.pickedbannedService.addPickClub(name)
    this.clubsService.removeClub(name)
    this.clubsData = this.clubsData.filter(club => club.name != name)
    console.log(this.pickedbannedService.getPickClubObs);
  }

  showNextPlayer() {
    
    const currentIndex = this.playerList$.indexOf(this.currentDisplayedPlayer)
    if (currentIndex < this.playerList$.length - 1) {
      this.currentDisplayedPlayer = this.playerList$[currentIndex + 1]
    } else {
      this.showPlayerListEndMessage = true; 
      this.isShowNextPlayerButtonDisabled = true;
      this.hideBtn = true
      this.hideBtnNext = false
  }
}

btnChange1() {
  if (this.firstPickClub ) {
    this.hideBtn = true
  } 
}
btnChange2() {
  if (this.secondPickClub ) {
    this.hideBtn2 = true
  } 
}
  



resetBtn(){
  this.hideBtn = false
  this.hideBtn2= false
}
}

