import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {
  availableSides = [
  { display: 'None', value: '' },
  { display: 'Light', value: 'light' },
  { display: 'Dark', value: 'dark' }
  ];
  swService: StarWarsService;

  constructor(swService: StarWarsService) {
    this.swService = swService;
   }

  ngOnInit() {
  }

  onSubmit(submittedForm) {
    console.log(submittedForm.value);
    if ( submittedForm.invalid ) {
      console.log('Fill in the fields');
      return;
    }
    this.swService.addCharacter(submittedForm.value.name, submittedForm.value.side);
  }

}
