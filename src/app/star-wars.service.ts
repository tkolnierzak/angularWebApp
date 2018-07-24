import { Injectable } from '../../node_modules/@angular/core';
import { LogService } from './log.service';
import { Subject } from '../../node_modules/rxjs';

@Injectable()
export class StarWarsService {

  private characters = [
    { name: 'Luke', side: ''},
    { name: 'Vader', side: ''}
  ];
  private logServices: LogService;
  charactersChanged = new Subject<void>();

  constructor(logService: LogService) {
    this.logServices = logService;
  }

  getCharacters(chosenList) {
    if (chosenList === 'all') {
      return this.characters.slice();
    }
    return this.characters.filter((char) => {
      return char.side === chosenList;
    });
  }

  onSideChosen(charInfo) {
    const pos = this.characters.findIndex((char) => {
      return char.name === charInfo.name;
    });
    this.characters[pos].side = charInfo.side;
    this.charactersChanged.next();
    this.logServices.writeLog('Changed side of ' + charInfo.name + ', new side: ' + charInfo.side);
  }

  addCharacter(name, side) {
    const pos = this.characters.findIndex((char) => {
      return char.name === name;
    });
    if (pos !== -1) {
      return;
    }
    const newChar = {name: name, side: side};
    this.characters.push(newChar);
  }
}
