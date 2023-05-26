import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PickedbannedService {

   pickedClubs = []
  private pickedClubsObs = new BehaviorSubject<string[]>([])

  constructor() { }

  addPickClub(clubPicked: string){
    this.pickedClubs.push(clubPicked)
    this.pickedClubsObs.next(this.pickedClubs)
    
  }

  getPickClubObs(): Observable<string[]>{
    return this.pickedClubsObs.asObservable()
  }

  removePickedClub(index: number) {
    this.pickedClubs.splice(index, 1);
    this.pickedClubsObs.next(this.pickedClubs);
  }
}
