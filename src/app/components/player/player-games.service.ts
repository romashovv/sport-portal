import { Injectable } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { TeamsService } from '../../services/teams.service';
import { StorageService } from '../../services/storage.service';
import { BehaviorSubject, forkJoin, map, switchMap } from 'rxjs';
import { Team } from '../../shared/models/teams';
import { RequestMatch } from '../../shared/models/request';
import { Game } from '../../shared/models/games';

@Injectable()
export class PlayerGamesService {
  private games = new BehaviorSubject<Game[]>([]);
  games$ = this.games.asObservable();

  constructor(private teamsService: TeamsService,
  ) {
  }

  public columns: TableColumn[] = [
    {name: 'Дата', prop: 'date'},
    {name: 'Команда 1', prop: 'teamOne'},
    {name: 'Команда 2', prop: 'teamTwo'},
    {name: 'Результат матча', prop: 'matchScore', sortable: false},
    {name: 'Забито голов', prop: 'goals', sortable: false}
  ]

  public getGames(userId: number) {
    this.teamsService.getPersonGames(userId).subscribe((games: Game[]) => {
      this.games.next(games)
    })
  }

}
