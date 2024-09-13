import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BooksComponent } from './books/books.component';
import { MyQuotesComponent } from './my-quotes/my-quotes.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Din login-sida
  { path: 'books', component: BooksComponent }, // Din books-sida
  { path: 'my-quotes', component: MyQuotesComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Default route om ingen annan rutt matchar
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
