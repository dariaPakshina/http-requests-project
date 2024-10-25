import {Component, OnInit} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgFor, NgIf} from '@angular/common';
import {Post} from './post.model';
import {PostsService} from './posts.service';
import {authInterceptor} from './auth.interceptor';
import {loggingInterceptor} from './logging.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;

  constructor(private http: HttpClient, private postServise: PostsService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postServise.fetchPosts().subscribe({
      next: (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error: (error) => {
        this.isFetching = false;
        this.error = error.message;
      },
      complete: () => {
        // console.log('Fetching posts completed');
      },
    });
  }

  onCreatePost(postData: Post) {
    this.postServise.createAndStorePost(postData.title, postData.content);
  }

  onHandleError() {
    this.error = null;
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postServise.fetchPosts().subscribe({
      next: (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error: (error) => {
        this.isFetching = false;
        this.error = error.message;
      },
      complete: () => {
        // console.log('Fetching posts completed');
      },
    });
  }

  onClearPosts() {
    this.postServise.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }
}
