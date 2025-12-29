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
    if (!this.postId) {
      this.dialogService.showWarning('Please enter a valid Post ID for updating!', 'Warning');
      return;
    }
    this.router.navigate(['/update-post', this.postId]); 
  }

  // ❌ Delete Post
  deletePost() {
    if (!this.postId) {
      this.dialogService.showWarning('Please enter a valid Post ID for deletion!', 'Warning');
      return;
    }
    this.dialogService.showConfirm('Are you sure you want to delete this post?', 'Confirm Delete').subscribe(confirmed => {
      if (confirmed) {
        this.recordService.deleteRecord(this.postId).subscribe({
          next: () => {
            this.dialogService.showSuccess('Post deleted successfully!', 'Success');
            this.postId = ''; // Clear ID after delete
          },
          error: (err) => {
            console.error('Error deleting post:', err);
            this.dialogService.showError('Failed to delete post. Please try again.', 'Error');
          }
        });
      }
    });
  }
}
