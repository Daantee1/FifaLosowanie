import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  
  
  private playerList: string[] = [];

  private playerListObs = new BehaviorSubject<string[]>([]);
  
  constructor() {}

  addPlayer(player: string){
    this.playerList.push(player)
    this.playerListObs.next(this.playerList)
  }

  removePlayer(player){
    this.playerList = this.playerList.filter(e => e!== player)
    this.playerListObs.next(this.playerList)
  }

  getPlayerListObs(): Observable<string[]>{
    return this.playerListObs.asObservable()
  }

  

}
