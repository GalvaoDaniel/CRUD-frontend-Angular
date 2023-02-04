import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Person } from '../model/person';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-people-form',
  templateUrl: './people-form.component.html',
  styleUrls: ['./people-form.component.css']
})
export class PeopleFormComponent implements OnInit {

  person: Person ={
    id: 0,
    name: ""
  }

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPerson();
  }

  save(): void {
    if (this.person && this.person.id) {
      this.personService.update(this.person).subscribe( _ => this.goBack());
    } else {
      this.personService.save(this.person).subscribe( _ => this.goBack());
    }
  }
  
  goBack():void {
    this.location.back();
  }

  getPerson(): void {
    const idPerson = Number(this.route.snapshot.paramMap.get('id'));
    if (idPerson) {
      this.personService.getPerson(idPerson).subscribe(
        person => this.person = person
      );
    }
  }
}


