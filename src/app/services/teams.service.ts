import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, map, mergeMap, Observable, switchMap, tap, toArray } from 'rxjs';
import { Team, Teams } from '../shared/models/teams';
import { ApiService } from './api.service';
import { QueryParams } from '../shared/models/params';
import { Game, Games } from '../shared/models/games';
import { PlayGame, User } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private teams = new BehaviorSubject<Teams>([]);
  teams$ = this.teams.asObservable();

  private team = new BehaviorSubject<Team>({all: 0, draw: 0, id: 0, lose: 0, name: '', rank: 0, win: 0});
  team$ = this.team.asObservable();

  private games = new BehaviorSubject<Games>([]);
  games$ = this.games.asObservable();

  constructor(public apiService: ApiService) {
  }

  getTeams(queryParams?: QueryParams) {
    return this.apiService.getTeams(queryParams).subscribe((items: Teams) => {
      this.teams.next(items);
    });
  }

  getTeam(id: number, queryParams?: QueryParams) {
    return this.apiService.getTeam(id, queryParams)
  }

  getGames(queryParams?: QueryParams) {
    return this.apiService.getGames(queryParams).subscribe((items: Games) => {
      this.games.next(items);
    });
  }

  getPersonGames(personID: number | undefined, queryParams?: QueryParams): Observable<Game[]> {
    if (!personID) return new Observable<Game[]>((q) => {return q});
    return this.apiService.getPerson(personID)
      .pipe(
        map((resp: User) => {
            return resp.games
          }
        ),
        switchMap((data: PlayGame[]) => {
          return forkJoin(
            data.map((playGame:PlayGame) => {
              return this.apiService.getGame(playGame.gamesId).pipe(
                map((game:Game): any => {
                  return {...game, goals: playGame.goals}
                })
              )
            })
          )
        }),
      )
  /*    .subscribe((games: Game[]) => {
        console.log('games:', games)
        // this.games.next(items);
      });*/
  }


}
