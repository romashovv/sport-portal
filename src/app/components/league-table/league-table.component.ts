import { Component, OnInit } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.scss']
})
export class LeagueTableComponent implements OnInit {

  public columns: TableColumn[] = [
    {name: 'Место', prop: 'rank'},
    {name: 'Команда', prop: 'name'},
    {name: 'И', prop: 'all', sortable: false},
    {name: 'В', prop: 'win', sortable: false},
    {name: 'Н', prop: 'draw', sortable: false},
    {name: 'П', prop: 'lose', sortable: false},
    {name: 'Очки', prop: 'score'}
  ]

  constructor(
    public teamsService: TeamsService,
  ) {}

  ngOnInit(): void {
    this.teamsService.getTeams({'_sort': 'score', '_order': 'desc'});
  }
}
