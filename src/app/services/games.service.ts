import { Injectable } from '@angular/core';
import { QueryParams } from '../shared/models/params';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { Games } from '../shared/models/games';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private games = new BehaviorSubject<Games>([]);
  games$ = this.games.asObservable();

  constructor(public apiService: ApiService) { }

  getGames(queryParams?: QueryParams) {
    return this.apiService.getGames(queryParams).subscribe((items: Games) => {
      this.games.next(items);
    });
  }
}
