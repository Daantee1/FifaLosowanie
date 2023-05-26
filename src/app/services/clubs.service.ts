import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, delay, map, of, tap, throwError } from 'rxjs';
import { IClub } from '../models/club';
@Injectable({
  providedIn: 'root'
})
export class ClubsService {

  constructor(private http: HttpClient) { }

  private apiUrl: string= 'assets/footballClubs/clubs.json'


  

  private _clubs: IClub[] = [];
  


  

  getClubsObs(): Observable<IClub[]>{
    if (this._clubs.length > 0) { 
      return of(this._clubs); // jeśli nie, zwracamy ją jako Observable przy pomocy operatora of()
    } else {
      return this.http.get<IClub[]>(this.apiUrl)
        .pipe(
          map(clubs => {
            this._clubs = clubs.filter(club => !club.isBanned);
            return this._clubs;
          }),
          catchError(this.errorHandler)
        );
    }
  }

 
  

  removeClub(name: string): Observable<IClub[]>  {
    const updatedClubs = this._clubs.map(club => {
      if (club.name === name) {
        club.isBanned = true;
      }
      return club;
    }).filter(club => !club.isBanned );
  
    this._clubs = updatedClubs;
    
    return of(updatedClubs);
  }
  
  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || 'server Error')
  }


  
  
}
