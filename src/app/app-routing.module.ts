import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ChampionsComponent } from './champions/champions.component';
import { ChampionComponent } from './champion/champion.component';
import { ItemsComponent } from './items/items.component';
import { ItemComponent } from './item/item.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'champions', component: ChampionsComponent },
  { path: 'champion/:id', component: ChampionComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'item/:id', component: ItemComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
