import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';

import { Champion } from './champion';

@Injectable()
export class ChampionsService {
  host: string = 'http://localhost:3000';
  champions;

  constructor(private http: Http) {}

  getChampions(){
    // To be modified
    if(!this.champions) {
      const url = `${this.host}/api/champions`;
      this.champions = this.http.get(url)
                                .map(res => res.json() as Champion[])
                                .publishReplay(1)
                                .refCount();
    }
    return this.champions;
  }

  getChampionById(id: number) {
    const url = `${this.host}/api/champion/${id}`;
    return this.http.get(url)
                    .map(res => res.json() as Champion[]);
  }
}
