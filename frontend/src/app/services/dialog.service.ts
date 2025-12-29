import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertDialogComponent } from '../shared/dialogs/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from '../shared/dialogs/confirm-dialog/confirm-dialog.component';

export interface AlertDialogData {
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
}

export interface ConfirmDialogData {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  /**
   * Shows an alert dialog
   * @param message The message to display
   * @param title Optional title for the dialog
   * @param type The type of alert (success, error, info, warning)
   * @returns Observable that emits when dialog is closed
   */
  showAlert(message: string, title: string = 'Alert', type: 'success' | 'error' | 'info' | 'warning' = 'info'): Observable<boolean> {
    const dialogRef: MatDialogRef<AlertDialogComponent, boolean> = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: {
        title,
        message,
        type
      } as AlertDialogData,
      disableClose: false
    });

    return dialogRef.afterClosed().pipe(
      map(result => result ?? true)
    );
  }

  /**
   * Shows a success alert dialog
   */
  showSuccess(message: string, title: string = 'Success'): Observable<boolean> {
    return this.showAlert(message, title, 'success');
  }

  /**
   * Shows an error alert dialog
   */
  showError(message: string, title: string = 'Error'): Observable<boolean> {
    return this.showAlert(message, title, 'error');
  }

  /**
   * Shows a warning alert dialog
   */
  showWarning(message: string, title: string = 'Warning'): Observable<boolean> {
    return this.showAlert(message, title, 'warning');
  }

  /**
   * Shows a confirmation dialog
   * @param message The message to display
   * @param title Optional title for the dialog
   * @param confirmText Optional text for confirm button
   * @param cancelText Optional text for cancel button
   * @returns Observable that emits true if confirmed, false if cancelled
   */
  showConfirm(
    message: string,
    title: string = 'Confirm',
    confirmText: string = 'Confirm',
    cancelText: string = 'Cancel'
  ): Observable<boolean> {
    const dialogRef: MatDialogRef<ConfirmDialogComponent, boolean> = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title,
        message,
        confirmText,
        cancelText
      } as ConfirmDialogData,
      disableClose: true
    });

    return dialogRef.afterClosed().pipe(
      map(result => result ?? false)
    );
  }
}

