import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChampionsService } from './../champions.service';

import { Champion } from './../champion';
import { SpinnerComponent } from './../spinner/spinner.component';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.css']
})
export class ChampionsComponent implements OnInit {

  champions: Champion[];
  loading: boolean;
  chpRouter: Router;

  constructor(private championService: ChampionsService, private router: Router) {
    this.champions = [];
    this.loading = true;
    this.chpRouter = this.router;
  }

  championInfo(id: number) {
    this.chpRouter.navigate(['/champion/' + id]);
  }

  getChampions(): void {
    this.championService
        .getChampions()
        .subscribe(champs => {
          this.champions = champs;
          this.loading = false;
        });
  }

  ngOnInit() {
    this.getChampions();
  }

}
