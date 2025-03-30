import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecordService } from '../../services/record.service';

@Component({
  selector: 'app-crud-buttons',
  templateUrl: './crud-buttons.component.html',
  styleUrls: ['./crud-buttons.component.css']
})
export class CrudButtonsComponent {
  postId: string = ''; // ID for update/delete

  constructor(private recordService: RecordService, private router: Router) {}

  // ✅ Create Post
  createPost() {
    this.router.navigate(['/create-post']); 
  }

  // ✏️ Update Post
  updatePost() {
    if (!this.postId) {
      alert('Please enter a valid Post ID for updating!');
      return;
    }
    this.router.navigate(['/update-post', this.postId]); 
  }

  // ❌ Delete Post
  deletePost() {
    if (!this.postId) {
      alert('Please enter a valid Post ID for deletion!');
      return;
    }
    if (confirm('Are you sure you want to delete this post?')) {
      this.recordService.deleteRecord(this.postId).subscribe({
        next: () => {
          alert('Post Deleted Successfully!');
          this.postId = ''; // Clear ID after delete
        },
        error: (err) => console.error('Error deleting post:', err),
      });
    }
  }
}
