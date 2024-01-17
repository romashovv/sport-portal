import { Injectable, OnInit } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { TeamsService } from '../../services/teams.service';
import { StorageService } from '../../services/storage.service';
import { Game, Games } from '../../shared/models/games';
import { BehaviorSubject, forkJoin, map, Observable, switchMap } from 'rxjs';
import { Team } from '../../shared/models/teams';
import { RequestMatch } from '../../shared/models/request';
import { PlayGame, User } from '../../shared/models/user';

@Injectable()
export class QueryMatchService {
  private requests = new BehaviorSubject<RequestMatch[]>([]);
  requests$ = this.requests.asObservable();

  constructor(private teamsService: TeamsService,
              private storageService: StorageService) {
  }

  public columns: TableColumn[] = [
    {name: 'Дата', prop: 'date'},
    {name: 'Команда', prop: 'teamName'},
  ]

  public getRequests() {
    this.teamsService.getRequestsMatch({'teamTwo': this.storageService.getUser().team})
      .pipe(
        switchMap((data: RequestMatch[]) => {
          return forkJoin(
            data.map((request: RequestMatch) => {
              return this.teamsService.getTeam(request.teamTwo).pipe(
                map((team: Team): RequestMatch => {
                  return {...request, teamName: team.name}
                })
              )
            })
          )
        }),
      )
      .subscribe((requests: RequestMatch[]) => {
        this.requests.next(requests)
      })
  }

}