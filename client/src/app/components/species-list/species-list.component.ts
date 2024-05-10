import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';
import { BirdSpecies } from '../../../../../common/tables/BirdSpecies';
import { MatDialog } from '@angular/material/dialog';
import { SpeciesDetailsComponent } from '../species-details/species-details.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.css']
})
export class SpeciesListComponent implements OnInit {
  speciesList: BirdSpecies[];
  constructor(
    private communicationService: CommunicationService,
    public dialog: MatDialog,
    private readonly notificationService: NotificationService
  ) { 
    
  }

  ngOnInit(): void {
    console.log('SpeciesListComponent');
    this.getSpecies();
  }

  getSpecies() {
    this.communicationService.getBirds().subscribe({
      next: (species) => {
        this.speciesList = species;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  onDeleteBirdFromList(species: string) {
    this.communicationService.deleteBird(species).subscribe({
      next: () => {
        this.speciesList = this.speciesList.filter((bird) => bird.nomscientifique !== species);
        this.notificationService.displaySuccessMessage('Espèce supprimée avec succès');
      },
      error: (error) => {
        console.error("Error deleting bird",error);
      }
    })
} 
openDetailsDialog(bird: BirdSpecies): void {
  this.dialog.open(SpeciesDetailsComponent, {
    width: '350px',

    data: { bird }
  });
}
}
