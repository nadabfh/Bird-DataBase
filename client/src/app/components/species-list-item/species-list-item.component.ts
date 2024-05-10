import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BirdSpecies } from '../../../../../common/tables/BirdSpecies';
import { MatDialog } from '@angular/material/dialog';
import { SpeciesCreationComponent } from '../species-creation/species-creation.component';

@Component({
  selector: 'app-species-list-item',
  templateUrl: './species-list-item.component.html',
  styleUrls: ['./species-list-item.component.css']
})
export class SpeciesListItemComponent implements OnInit {
  @Input() species: BirdSpecies;
  @Output() deleteBirdFromList: EventEmitter<string> = new EventEmitter<string>();


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  deleteBird(event: MouseEvent): void {
    event.stopPropagation();
    this.deleteBirdFromList.emit(this.species.nomscientifique);
  }
  modifyBird(event: MouseEvent): void {
    event.stopPropagation();
    this.dialog.open(SpeciesCreationComponent, {
    width: '70%',
    height: '70%',
    data: { bird: this.species }
  });
 

  }
  
}
