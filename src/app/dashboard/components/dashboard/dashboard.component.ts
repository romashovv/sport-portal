import { Component, OnInit } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { TeamsService } from '../../../services/teams.service';

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
    public teamsService: TeamsService
  ) {}

  ngOnInit(): void {
    this.teamsService.getGames({'_sort': 'date', '_order': 'desc'});
  }
}
