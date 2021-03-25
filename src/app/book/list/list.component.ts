import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookService} from '../../services/book-service';
import {Router} from '@angular/router';
import {BookModel} from '../../models/book.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  books: BookModel[];
  bookSubscription: Subscription;

  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bookSubscription = this.bookService.booksSubject.subscribe(
      (books: BookModel[]) => {
        this.books = books;
      }
    )
    this.bookService.emitBooks();
  }

  onNewBook(){
    this.router.navigate(['/books', 'new']);
  }


  onDeleteBook(book: BookModel) {
    this.bookService.removeBook(book);
  }

  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }

  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
  }
}
