import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Zabawa';
  
  showComponent: boolean;

  showBoxPlayer: boolean;
  showBanPick: boolean;
  showPickSelect: boolean;
  showRouletteSelect: boolean;
  audio = null;

  constructor(private router: Router, private route: ActivatedRoute) {}



  playSound(){
    if (this.audio == null || this.audio.paused){ 
      this.audio = new Audio()
      this.audio.src ="./assets/music/Hymn ligi mistrzów.mp3"
      this.audio.load()
      this.audio.play()
    }else{
      this.audio.pause()
    }
    
   
  }
  


  ngOnInit() {


    

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.showComponent = this.router.url === '/';
    });
  
    
 

  
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.showBoxPlayer = this.router.url === '/box-player';
      this.showBanPick = this.router.url === '/ban-pick';
      this.showPickSelect = this.router.url === '/pick-select';
      this.showRouletteSelect = this.router.url === '/roulette-select';
    });

  }
  }


  


