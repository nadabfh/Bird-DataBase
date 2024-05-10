import { Component, Inject, OnInit } from '@angular/core';
import { BirdSpecies } from '../../../../../common/tables/BirdSpecies';
import { CommunicationService } from 'src/app/services/communication.service';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
// import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-species-creation',
  templateUrl: './species-creation.component.html',
  styleUrls: ['./species-creation.component.css']
})
export class SpeciesCreationComponent implements OnInit {
  
  bird: BirdSpecies = {
    nomscientifique: '',
    nomcommun: '',
    statutspeces: '',
    nomscientifiquecomsommer: ''
  };
  selectedStatus: string = '';
  customStatus: string = '';
  originalBird: BirdSpecies;
  subscription: Subscription;
  birdsWithNullPredator: BirdSpecies[];
  constructor(private readonly communicationService: CommunicationService,public dialogRef: MatDialogRef<SpeciesCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private readonly notificationService: NotificationService) {
    // , private readonly notificationService: NotificationService
   
   }
   
  ngOnInit(): void {
    if (this.data) {
      if (this.data.bird) {
        this.bird = { ...this.data.bird };
        this.originalBird = { ...this.data.bird };
        this.selectedStatus = this.data.bird.statutspeces;
      }
      
      if (this.data.bird && !this.isPredefinedStatus(this.data.bird.statutspeces)) {
        this.customStatus = this.data.bird.statutspeces;
      }
    } 

    
    if(this.bird.statutspeces === ''){
      this.selectedStatus = 'custom';
      this.customStatus = this.bird.statutspeces;
    }
    
    this.communicationService.getBirdsNullPredator().subscribe({
      next: (species) => {
        this.birdsWithNullPredator = species;
        console.log('Birds with null predator:', this.birdsWithNullPredator);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  isPredefinedStatus(status: string): boolean {
    const predefinedStatuses = ['Vulnérable', 'Préoccupation mineure', 'Non menacée'];
    return predefinedStatuses.includes(status);
  }

  onStatusSelected(status: string) {
    if (status === 'custom') {
      this.bird.statutspeces = this.customStatus; 
    } else {
      this.bird.statutspeces = status;
      this.customStatus = ''; 
    }
  }

  onCustomStatusChanged(customStatus: string) {
    if (this.selectedStatus === 'custom') {
      this.customStatus = customStatus;
      this.bird.statutspeces = customStatus;
    }
  }

  submitForm() {
    console.log('Bird:', this.originalBird);
    if (this.originalBird) {
      this.communicationService.updateBird(this.originalBird.nomscientifique,this.bird).subscribe({
        next: (response) => {
          this.notificationService.displaySuccessMessage('Espèce mise à jour avec succès');
          console.log('Bird updated successfully', response);
          this.closeDialog();
          // window.location.reload();
        },
        error: (error) => {
          console.error('Error updating bird:', error);
        }
      });
    } else {
      this.communicationService.createBird(this.bird).subscribe({
        next: (response) => {
          console.log('Bird created successfully', response);
          this.notificationService.displaySuccessMessage('Espèce créée avec succès');
          this.closeDialog();
          // window.location.reload();
        },
        error: (error) => {
          console.error('Error creating bird:', error);
        }
      });
    }
  }
   closeDialog() {
    this.dialogRef.close();
  }
  
  
}
