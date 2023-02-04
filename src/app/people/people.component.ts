import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from '../model/person';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  peopleList: Person[] = [];

  constructor(
    private personService: PersonService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPeople();
  }

  getPeople(): void {
    this.personService.getPeople()
      .subscribe(peopleList => this.peopleList = peopleList);
  }

  gotToPeopleForm(): void {
    this.router.navigateByUrl('/person');
  }

  delete(personId: number) {
    if(personId) 
      this.personService.delete(personId)
        .subscribe( _ => {
          this.getPeople();
          alert("Person deleted successfully!")
        });
  }

}
