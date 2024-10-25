import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Post} from './post.model';
import {catchError, tap, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  error = null;
  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content};
    this.http
      .post<Post>('https://136a084560e31d19.mokky.dev/posts', postData, {
        observe: 'response',
      })
      .subscribe({
        next: (resData) => {
          console.log(resData.body);
        },
        error: (error) => {
          this.error = error.message;
        },
        complete: () => {
          // console.log('Fetching posts completed');
        },
      });
  }

  fetchPosts() {
    return this.http.get<Post[]>('https://136a084560e31d19.mokky.dev/posts', {
      headers: new HttpHeaders({'Custom-Header': 'Hello!'}),
      // params: new HttpParams().set('print', 'pretty'),
    });
  }

  deletePosts() {
    return this.http
      .patch('https://136a084560e31d19.mokky.dev/posts', [], {
        observe: 'events',
        // responseType: 'text',
      })
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            //
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
