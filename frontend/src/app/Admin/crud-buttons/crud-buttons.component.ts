import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecordService } from '../../services/record.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-crud-buttons',
  templateUrl: './crud-buttons.component.html',
  styleUrls: ['./crud-buttons.component.css']
})
export class CrudButtonsComponent {
  postId: string = ''; // ID for update/delete
  isDeleting: boolean = false; // Loading state for delete

  constructor(
    private recordService: RecordService,
    private router: Router,
    private dialogService: DialogService
  ) {}

  // ✅ Create Post
  createPost() {
    this.router.navigate(['/create-post']); 
  }

  // ✏️ Update Post
  updatePost() {
    if (!this.postId || this.postId.trim() === '') {
      this.dialogService.showWarning('Please enter a valid Post ID for updating!', 'Warning');
      return;
    }

    // Validate ID format (MongoDB ObjectId is 24 hex characters)
    const trimmedId = this.postId.trim();
    if (trimmedId.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(trimmedId)) {
      this.dialogService.showError(
        'Invalid Post ID format. Please enter a valid 24-character MongoDB ID.',
        'Invalid ID'
      );
      return;
    }

    this.router.navigate(['/update-post', trimmedId]); 
  }

  // ❌ Delete Post
  deletePost() {
    // Validate Post ID
    if (!this.postId || this.postId.trim() === '') {
      this.dialogService.showWarning('Please enter a valid Post ID for deletion!', 'Warning');
      return;
    }

    // Validate ID format (MongoDB ObjectId is 24 hex characters)
    const trimmedId = this.postId.trim();
    if (trimmedId.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(trimmedId)) {
      this.dialogService.showError(
        'Invalid Post ID format. Please enter a valid 24-character MongoDB ID.',
        'Invalid ID'
      );
      return;
    }

    // Show confirmation dialog
    this.dialogService.showConfirm(
      `Are you sure you want to delete post with ID: ${trimmedId}? This action cannot be undone.`,
      'Confirm Delete',
      'Delete',
      'Cancel'
    ).subscribe(confirmed => {
      if (confirmed) {
        this.isDeleting = true;
        
        this.recordService.deleteRecord(trimmedId).subscribe({
          next: (response) => {
            this.isDeleting = false;
            
            // Handle JSON response with message field
            const successMessage = response?.message || 
              response || 
              `Post with ID "${trimmedId}" has been deleted successfully!`;
            
            this.dialogService.showSuccess(
              successMessage,
              'Delete Successful'
            );
            this.postId = ''; // Clear ID after successful delete
          },
          error: (err) => {
            this.isDeleting = false;
            console.error('Error deleting post:', err);
            
            // Provide specific error messages based on error type
            let errorMessage = 'Failed to delete post. ';
            let errorTitle = 'Delete Failed';

            if (err.status === 0 || err.status === undefined) {
              // Network error
              errorMessage += 'Unable to connect to server. Please check your internet connection and try again.';
              errorTitle = 'Connection Error';
            } else if (err.status === 401) {
              // Unauthorized
              errorMessage += 'Your session has expired. Please login again.';
              errorTitle = 'Authentication Required';
            } else if (err.status === 403) {
              // Forbidden
              errorMessage += 'You do not have permission to delete this post.';
              errorTitle = 'Access Denied';
            } else if (err.status === 404) {
              // Not found - use server message if available
              const serverMessage = err.error?.message || err.error?.error;
              errorMessage = serverMessage || `Post with ID "${trimmedId}" was not found. Please verify the ID and try again.`;
              errorTitle = 'Post Not Found';
            } else if (err.status === 500) {
              // Server error
              const serverMessage = err.error?.message || err.error?.error;
              errorMessage = serverMessage || 'Server error occurred. Please try again later or contact support.';
              errorTitle = 'Server Error';
            } else {
              // Other errors - use server message if available
              const serverMessage = err.error?.message || err.error?.error || err.message || err.error || 'Unknown error occurred';
              errorMessage = serverMessage.startsWith('Failed to delete post') ? serverMessage : `Failed to delete post. ${serverMessage}`;
            }

            this.dialogService.showError(errorMessage, errorTitle);
          }
        });
      }
    });
  }
}
