import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public matchForm!: FormGroup
  selected!: Date | null;
  isSelectedDate: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public teamsService: TeamsService
  ) {}

  ngOnInit(): void {
    this.matchForm = this.formBuilder.group({
      team: ['', Validators.required],
    })

    this.teamsService.getTeams({'_sort': 'score', '_order': 'desc'});
  }

  change(event: Date | null) {
    this.isSelectedDate = true;
  }


}
