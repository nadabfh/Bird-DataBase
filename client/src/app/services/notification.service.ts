import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar'; 
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }
  displayErrorMessage(errorMessage: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.openSnackBar(errorMessage, '✖', {
        duration: 5000,
        panelClass: ['error-snackbar'],
    });
}

  displaySuccessMessage(successMessage: string): MatSnackBarRef<TextOnlySnackBar> {
      return this.openSnackBar(successMessage, '✔', {
          duration: 5000,
          panelClass: ['success-snackbar'],
      });
  }

private openSnackBar(message: string, action: string, options?: MatSnackBarConfig): MatSnackBarRef<TextOnlySnackBar> {
  return this.snackBar.open(message, action, options);
}
}
