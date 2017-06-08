import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ChampionsService } from '../champions.service';

@Component({
  selector: 'app-champion',
  templateUrl: './champion.component.html',
  styleUrls: ['./champion.component.css']
})
export class ChampionComponent implements OnInit {
  champion;
  constructor(private activatedRoute: ActivatedRoute, private championsService: ChampionsService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const championId = params['id'];
      this.getChampion(championId);
    });
  }
  getChampion(id: number) {
    this.championsService.getChampionById(id)
                         .subscribe(champ => {
                           this.champion = champ;
                         });
  }
}
