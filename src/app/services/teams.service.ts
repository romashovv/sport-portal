import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable, switchMap } from 'rxjs';
import { Team, Teams } from '../shared/models/teams';
import { ApiService } from './api.service';
import { QueryParams } from '../shared/models/params';
import { Game } from '../shared/models/games';
import { PlayGame, User } from '../shared/models/user';
import { RequestMatch } from '../shared/models/request';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private teams = new BehaviorSubject<Teams>([]);
  teams$ = this.teams.asObservable();

  private team = new BehaviorSubject<Team>({all: 0, draw: 0, id: 0, lose: 0, name: '', rank: 0, win: 0});
  team$ = this.team.asObservable();

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

  getRequestsMatch(queryParams?: QueryParams): Observable<RequestMatch[]> {
    return this.apiService.getRequestsMatch(queryParams)
  }

  postRequestMatch(payload: RequestMatch, queryParams?: QueryParams): Observable<RequestMatch> {
    return this.apiService.postRequestMatch(payload, queryParams);
  }

  getPersonGames(personID: number | undefined, queryParams?: QueryParams): Observable<Game[]> {
    if (!personID) return new Observable<Game[]>((q) => {return q});
    return this.apiService.getPerson(personID, queryParams)
      .pipe(
        map((resp: User) => {
            return resp.games
          }
        ),
        switchMap((data: PlayGame[]) => {
          return forkJoin(
            data.map((playGame:PlayGame) => {
              return this.apiService.getGame(playGame.gamesId).pipe(
                map((game:Game): Game => {
                  return {...game, goals: playGame.goals}
                })
              )
            })
          )
        }),
      )
  }


}
