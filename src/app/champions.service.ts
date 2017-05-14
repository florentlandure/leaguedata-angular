import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';

import { Champion } from './champion';

@Injectable()
export class ChampionsService {
  apiKey = 'RGAPI-ad4193b2-3bd8-4de9-a9c8-c397f91b6fa7';
  championsUrl: string = 'https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion?champData=all&api_key=' + this.apiKey;

  champions;

  constructor(private http: Http) {}

  getChampions(){
    if(!this.champions) {
      this.champions = this.http.get(this.championsUrl)
                    .map(res => res.json().data as Champion[])
                    .publishReplay(1)
                    .refCount();
    }
    return this.champions;
  }

}
