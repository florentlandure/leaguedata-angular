import { Component, OnInit } from '@angular/core';
import { ChampionsService } from './../champions.service';

import { Champion } from './../champion';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.css']
})
export class ChampionsComponent implements OnInit {

  champions: Champion[] = [];

  constructor(private championService: ChampionsService) { }

  getChampions(): void {
    this.championService
        .getChampions()
        .then(champs => {
          const keys = Object.keys(champs);
          keys.forEach(k => {
            this.champions.push(champs[k]);
          });
          this.champions.sort((a, b) => {
            if(a.key.toLowerCase() < b.key.toLowerCase()) {
              return -1;
            }
            if(a.key.toLowerCase() > b.key.toLowerCase()) {
              return 1;
            }
            return 0;
          });
        });
  }

  ngOnInit() {
    this.getChampions();
  }

}
