import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../services/book-service';
import {Router} from '@angular/router';
import {BookModel} from '../../models/book.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  bookForm: FormGroup;
  fileIsUploading: Boolean = false;
  fileUrl: string;
  fileUploaded: Boolean =  false;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      synopsis: ['']
    });
  }

  onSaveBook(){
    const title = this.bookForm.get('title').value;
    const author = this.bookForm.get('author').value;
    const synopsis = this.bookForm.get('synopsis').value;

    const newBook = new BookModel(title, author);
    newBook.synopsis = synopsis;

    if(this.fileUrl && this.fileUrl !== '') {
      newBook.photo = this.fileUrl;
    }

    this.bookService.createNewBook(newBook);
    this.router.navigate(['/books']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.bookService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event) {
    console.dir(event.target);
    this.onUploadFile(event.target.files[0]);
  }
}
