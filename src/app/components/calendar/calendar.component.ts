import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamsService } from '../../services/teams.service';
import { filter, map, Observable } from 'rxjs';
import { Team, Teams } from '../../shared/models/teams';
import { StorageService } from '../../services/storage.service';
import { Game } from '../../shared/models/games';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestMatch } from '../../shared/models/request';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public matchForm!: FormGroup
  date!: Date | null;
  isSelectedDate: boolean = false;
  public teams: Observable<Team[]> | undefined;

  get user() {
    return this.storageService.getUser()
  }

  get minDate() {
    return new Date()
  }

  constructor(
    private formBuilder: FormBuilder,
    public teamsService: TeamsService,
    private storageService: StorageService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.matchForm = this.formBuilder.group({
      team: ['', Validators.required],
    })

    this.teamsService.getTeams({'_sort': 'score', '_order': 'desc'});

    this.teams = this.teamsService.teams$.pipe(
      map((teams: Teams) => teams.filter((team: Team) => team.id !== this.user.team))
    );
  }

  change(event: Date | null): void {
    this.isSelectedDate = true;
  }

  public send(): void {
    console.log('send', {...this.matchForm.getRawValue(), date: this.date?.toLocaleDateString().replaceAll('.', '-')})
    const formValue = this.matchForm.getRawValue()
    const payload: RequestMatch = {
      teamOne: this.user.team,
      teamTwo: formValue.team,
      date: this.date!.toLocaleDateString().replaceAll('.', '-'),
    }
    this.teamsService.postRequestMatch(payload).subscribe(() => {
      this.snackBar.open('Заявка отправлена!', 'Закрыть')
    })
  }

}
