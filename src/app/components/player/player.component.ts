import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Game } from '../../shared/models/games';
import { TableColumn } from '@swimlane/ngx-datatable';
import { TeamsService } from '../../services/teams.service';
import { Team } from '../../shared/models/teams';
import { QueryMatchService } from './query-match.service';
import { PlayerGamesService } from './player-games.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  providers: [QueryMatchService, PlayerGamesService]
})
export class PlayerComponent implements OnInit{
  @Input() user: User | undefined;
  public personalForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public teamsService: TeamsService,
              public queryMatchService: QueryMatchService,
              public playerGamesService: PlayerGamesService
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

    this.queryMatchService.getRequests();
    if (this.user?.id) {
      this.playerGamesService.getGames(this.user?.id)
    }

    if (this.user?.team) {
      this.teamsService.getTeam(this.user.team).subscribe((team: Team) => {
        this.personalForm.get('team')?.patchValue(team.name);
      });
    }
  }
}
