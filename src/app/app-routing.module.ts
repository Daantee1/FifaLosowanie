import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BanPickComponent } from './ban-pick/ban-pick.component';
import { BoxPlayerComponent } from './box-player/box-player.component';
import { PickSelectComponent } from './pick-select/pick-select.component';
import { RouletteSelectComponent } from './roulette-select/roulette-select.component';





const routes: Routes = [
  {path: 'box-player', component: BoxPlayerComponent},
  { path: 'ban-pick', component: BanPickComponent},
  { path: 'pick-select', component: PickSelectComponent},
  { path: 'roulette-select', component: RouletteSelectComponent}

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

