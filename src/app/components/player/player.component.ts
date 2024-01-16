import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Game } from '../../shared/models/games';
import { TableColumn } from '@swimlane/ngx-datatable';
import { TeamsService } from '../../services/teams.service';
import { Team } from '../../shared/models/teams';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit{
  @Input() user: User | undefined;
  public personalForm!: FormGroup;
  public games: Game[] | undefined;
  public columns: TableColumn[] = [
    {name: 'Дата', prop: 'date'},
    {name: 'Команда 1', prop: 'teamOne'},
    {name: 'Команда 2', prop: 'teamTwo'},
    {name: 'Результат матча', prop: 'matchScore', sortable: false},
    {name: 'Забито голов', prop: 'goals', sortable: false}
  ]

  constructor(private formBuilder: FormBuilder,
              public teamsService: TeamsService,
  ) { }

  ngOnInit(): void {
    this.personalForm = this.formBuilder.group({
      lastName: [{ value: this.user?.lastName, disabled: true }],
      firstName: [{ value: this.user?.firstName, disabled: true }],
      middleName: [{ value: this.user?.middleName, disabled: true }],
      team: [{ value: this.user?.team, disabled: true }],
      playGames: [{ value: this.user?.playGames, disabled: true }],
      goalScored: [{ value: this.user?.goalScored, disabled: true }],
    })

    if (this.user?.team) {
      this.teamsService.getTeam(this.user.team).subscribe((team: Team) => {
        this.personalForm.get('team')?.patchValue(team.name);
      });
    }

    if (this.user?.id) {
      this.teamsService.getPersonGames(this.user?.id).subscribe((games: Game[]) => this.games = games)
    }
  }
}
