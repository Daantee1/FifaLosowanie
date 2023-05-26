import { Component } from '@angular/core';
import { PlayersService } from '../services/players.service';
import { ClubsService } from '../services/clubs.service';
import { IClub } from '../models/club';
import { PickedbannedService } from '../services/pickedbanned.service';
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-ban-pick',
  templateUrl: './ban-pick.component.html',
  styleUrls: ['./ban-pick.component.css'],
})
export class BanPickComponent {

  playerList$: string[] = [];
  currentDisplayedPlayer: string;
  isPlayerListDisplayed: boolean = false;
  pickedClub: IClub[] = []
  clubsData: IClub[] = []
  name: any
  firstBanClub: string;
  secondBanClub: string;
  hideBtn = false
  hideBtn2 = false
  showPlayerListEndMessage = false
  isShowNextPlayerButtonDisabled = false
  hideBtnNext = true
  




  constructor(private playersSerivce: PlayersService, private clubsService: ClubsService, private pickedbannedService: PickedbannedService
    , private http: HttpClient) {
    this.playersSerivce.getPlayerListObs().subscribe(players => {
      this.playerList$ = players
      if (this.playerList$.length > 0) {
        this.currentDisplayedPlayer = this.playerList$[0]
      }
    })
    this.clubsService.getClubsObs().subscribe(clubs => this.clubsData = Object.values(clubs))
  }

  ngOnInit() {
    
    this.isPlayerListDisplayed = true; // wyświetlenie pierwszego gracza
   

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


  removeClub(name: string) {
    this.clubsService.removeClub(name)
    this.clubsData = this.clubsData.filter(club => club.name !== name );
  }

  btnChange1() {
    if (this.firstBanClub ) {
      this.hideBtn = true
    } 
  }
  btnChange2() {
    if (this.secondBanClub ) {
      this.hideBtn2 = true
    } 
  }
    

  resetBtn(){
    this.hideBtn = false
    this.hideBtn2= false
  }


  









}
