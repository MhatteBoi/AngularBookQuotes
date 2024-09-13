import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html'
})
export class BooksComponent {
  books: any[] = [];

  constructor(private http: HttpClient) {
    this.getBooks();
  }

  getBooks() {
    const token = localStorage.getItem('token'); // Hämta JWT-token från localStorage

    // Om ingen token hittas, returnera eller visa ett felmeddelande
    if (!token) {
      console.error('Ingen token hittades. Logga in först.');
      return;
    }

    // Sätt Authorization-headern med Bearer-token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any[]>('https://localhost:7214/api/book', { headers })
      .subscribe(
        data => {
          this.books = data;
        },
        error => {
          console.error('Error fetching books:', error);
        }
      );
  }

  addBook(newBook: { title: string; author: string; publishedDate: string }) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post<any>('https://localhost:7214/api/book', newBook, { headers })
      .subscribe(
        response => {
          console.log('Book added successfully:', response);
          this.getBooks(); // Hämta listan på böcker igen efter att en ny bok har lagts till
        },
        error => {
          console.error('Error adding book:', error);
        }
      );
  }

  updateBook(updatedBook: { id: number; title: string; author: string; publishedDate: string }) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.put<any>(`https://localhost:7214/api/book/${updatedBook.id}`, updatedBook, { headers })
      .subscribe(
        response => {
          console.log('Book updated successfully:', response);
          this.getBooks(); // Hämta listan igen efter att en bok har uppdaterats
        },
        error => {
          console.error('Error updating book:', error);
        }
      );
  }

  deleteBook(bookId: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.delete<any>(`https://localhost:7214/api/book/${bookId}`, { headers })
      .subscribe(
        response => {
          console.log('Book deleted successfully:', response);
          this.getBooks(); // Hämta listan igen efter att en bok har tagits bort
        },
        error => {
          console.error('Error deleting book:', error);
        }
      );
  }

}
