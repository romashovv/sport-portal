import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team, Teams } from '../shared/models/teams';
import { QueryParams } from '../shared/models/params';
import { Game, Games } from '../shared/models/games';
import { User } from '../shared/models/user';
import { RequestMatch } from '../shared/models/request';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(public http: HttpClient) {
  }

  getTeams(queryParams?: QueryParams): Observable<Teams> {
    return this.http.get<Teams>('http://localhost:3000/teams', {params: queryParams});
  }

  getTeam(id: number, queryParams?: QueryParams): Observable<Team> {
    return this.http.get<Team>(`http://localhost:3000/teams/${id}`, {params: queryParams});
  }

  getGame(gameID: number, queryParams?: QueryParams): Observable<Game> {
    return this.http.get<Game>(`http://localhost:3000/games/${gameID}`, {params: queryParams});
  }

  getGames(queryParams?: QueryParams): Observable<Games> {
    return this.http.get<Games>('http://localhost:3000/games', {params: queryParams});
  }

  getPerson(personID: number, queryParams?: QueryParams): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/user/${personID}`, {params: queryParams});
  }

  postRequestMatch(payload: RequestMatch): Observable<RequestMatch> {
    return this.http.post<RequestMatch>(`http://localhost:3000/requests`, payload)
  }

  getRequestsMatch(queryParams?: QueryParams): Observable<RequestMatch[]> {
    return this.http.get<RequestMatch[]>(`http://localhost:3000/requests`, {params: queryParams})
  }
}
