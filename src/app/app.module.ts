import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

//Components
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ListComponent } from './book/list/list.component';
import { SingleBookComponent } from './book/single-book/single-book.component';
import { FormComponent } from './book/form/form.component';
import { HeaderComponent } from './header/header.component';


//Services
import {AuthService} from './services/auth-service';
import {BookService} from './services/book-service';
import {AuthGuardService} from './services/auth-guard-service';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'books', canActivate: [AuthGuardService], component: ListComponent },
  { path: 'books/new', canActivate: [AuthGuardService] , component: FormComponent },
  { path: 'books/view/:id', canActivate: [AuthGuardService], component: SingleBookComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: '**', redirectTo: 'books' }
];

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    ListComponent,
    SingleBookComponent,
    FormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbModule
  ],
  providers: [
    AuthService,
    BookService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
