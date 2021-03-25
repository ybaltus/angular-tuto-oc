import { Component, OnInit } from '@angular/core';
import {BookService} from '../../services/book-service';
import {ActivatedRoute, Router} from '@angular/router';
import {BookModel} from '../../models/book.model';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {
  book: BookModel;

  constructor(
    private bookService: BookService,
    private router: Router,
    private routerActivated: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.book = new BookModel('', '');
    const id = this.routerActivated.snapshot.params['id'];
    this.bookService.getSingleBook(+id).then(
      (book: BookModel) => {
        this.book = book;
      }
    );
  }

  onBack(){
    this.router.navigate(['/books']);
  }
}
