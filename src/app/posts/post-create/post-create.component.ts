import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';

//services
import { SharingDataService } from 'src/app/services/sharing-data.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  public postForm!: FormGroup;
  public postId: number = 0;
  public isChecked: boolean = true;
  public status: any;
  public postDetail: any;
  public existingPost: any;
  public isEditPost: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private shareDataSvc: SharingDataService) { }

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.params['id'];
    this.existingPost = this.activatedRoute.snapshot.data['post'];
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', [Validators.required]]
    });

    if (this.existingPost) {
      this.isEditPost = true;
      if (this.existingPost.status === 1) {
        this.isChecked = true;
      } else {
        this.isChecked = false;
      }
      this.status = this.existingPost.status;
      this.postForm.patchValue({
        id: this.existingPost.id,
        title: this.existingPost.title,
        description: this.existingPost.description
      });
    }
    this.getPostData();
  }

  getPostData() {
    const data = this.shareDataSvc.getPostData();
    this.postDetail = data;

    if (this.postDetail) {
      if (this.postDetail.status === 1) {
        this.isChecked = true;
      } else {
        this.isChecked = false;
      }
      this.status = this.postDetail.status;
      this.postForm.setValue({
        title: this.postDetail.title,
        description: this.postDetail.description
      });
    }
  }

  public myError = (controlName: string, errorName: string) => {
    return this.postForm.controls[controlName].hasError(errorName);
  }

  changeToggle($event: MatSlideToggleChange) {
    if ($event.checked) {
      this.status = 1;
    } else {
      this.status = 0;
    }
  }

  confirmPost() {
    this.shareDataSvc.setPostData({
      postId: this.postId,
      status: this.status,
      title: this.postForm.value.title,
      description: this.postForm.value.description
    });
    this.router.navigate(['/post-confirm']);
  }

  clearData() {
    this.postForm.reset();
  }
}
