import { Component, OnInit } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { GamesService } from '../../../services/games.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public columns: TableColumn[] = [
    {name: 'Дата', prop: 'date'},
    {name: 'Команда 1', prop: 'teamOne'},
    {name: 'Счёт', prop: 'matchScore'},
    {name: 'Команда 2', prop: 'teamTwo'},
  ]

  constructor(
    public gamesService: GamesService
  ) {}

  ngOnInit(): void {
    this.gamesService.getGames({'_sort': 'date', '_order': 'desc', 'matchScore_ne': 'null'});
  }
}
