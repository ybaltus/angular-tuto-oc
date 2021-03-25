import {Injectable} from '@angular/core';
import {BookModel} from '../models/book.model';
import { Subject } from 'rxjs';
import firebase from 'firebase/app';
import DataSnapshot = firebase.database.DataSnapshot;
import "firebase/database";
import "firebase/storage";

@Injectable()
export class BookService{
  books: BookModel[] = [];
  booksSubject = new Subject<BookModel[]>();
  refFirebase = firebase.database().ref('/books');

  constructor() {
    this.getBooks();
  }

  emitBooks(){
    this.booksSubject.next(this.books);
  }

  saveBooks() {
    // firebase.database().ref('/books').set(this.books);
    this.refFirebase.set(this.books);
  }

  getBooks(){
   // let ref=  firebase.database().ref('/books');
   this.refFirebase.on('value', (dataSnapshot: DataSnapshot)=>{
      this.books = dataSnapshot.val() ? dataSnapshot.val(): [];
      this.emitBooks();
   })
  }

  getSingleBook(id: number){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (dataSnapshot: DataSnapshot) => {
            resolve(dataSnapshot.val());
          }, (error) => {
            reject(error);
          }
        )
      }
    )
  }

  createNewBook(newBook: BookModel){
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: BookModel){
    if(book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if(bookEl === book){
          return true
        }
      }
    )
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File){
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
}
