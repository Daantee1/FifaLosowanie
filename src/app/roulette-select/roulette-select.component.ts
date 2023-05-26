import { Component, ElementRef, ViewChild } from '@angular/core';
import { PlayersService } from '../services/players.service';
import { HttpClient } from '@angular/common/http';
import { ClubsService } from '../services/clubs.service';
import { PickedbannedService } from '../services/pickedbanned.service';
import { queueScheduler } from 'rxjs';




@Component({
  selector: 'app-roulette-select',
  templateUrl: './roulette-select.component.html',
  styleUrls: ['./roulette-select.component.css']
})
export class RouletteSelectComponent {

  

  
  playerList$: string[] = [];
  currentDisplayedPlayer: string;
  showPlayerListEndMessage = false
  isShowNextPlayerButtonDisabled = false
  isShowSelectClubButtonDisabled = false
  isClickClubDisabled = false
  showLoading = false
  pickedClub: string;
  @ViewChild('spinner') spinner: ElementRef;



  constructor(private playersSerivce: PlayersService, private clubsService: ClubsService, private pickedbannedService: PickedbannedService
    , private http: HttpClient) {
    this.playersSerivce.getPlayerListObs().subscribe(players => {
      this.playerList$ = players
      if (this.playerList$.length > 0) {
        this.currentDisplayedPlayer = this.playerList$[0]
      }
    })
    
  }


  showNextPlayer() {

    const currentIndex = this.playerList$.indexOf(this.currentDisplayedPlayer)
    if (currentIndex < this.playerList$.length - 1) {
      this.isClickClubDisabled = false
      this.currentDisplayedPlayer = this.playerList$[currentIndex + 1]
    } else {
      this.showPlayerListEndMessage = true;
      this.isShowNextPlayerButtonDisabled = true;
      this.isShowSelectClubButtonDisabled = true
      

    }
  }


  
  async pickRandomClub() {
    
    const numClubs = this.pickedbannedService.pickedClubs.length
    if (numClubs > 0 && !this.isClickClubDisabled){
      this.loadingSpinner()
      this.isClickClubDisabled = true
      const randomIndex = Math.floor(Math.random() * numClubs)
      const pickedClub = this.pickedbannedService.pickedClubs[randomIndex]
      this.pickedbannedService.removePickedClub(randomIndex)
      
      await new Promise(resolve => setTimeout(resolve, 1300))
      this.pickedClub = pickedClub
      this.isClickClubDisabled = false 
      this.hideLoadingSpinner()
      
    }
  }

  loadingSpinner(){
    this.spinner.nativeElement.style.display = 'inline-block';
  }

  hideLoadingSpinner() {
    this.spinner.nativeElement.style.display = 'none'
  }
}



