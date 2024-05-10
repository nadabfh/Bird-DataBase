import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BirdSpecies } from '../../../../../common/tables/BirdSpecies';

@Component({
  selector: 'app-species-details',
  templateUrl: './species-details.component.html',
  styleUrls: ['./species-details.component.css']
})
export class SpeciesDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { bird: BirdSpecies }) { }

  ngOnInit(): void {
  }
}
