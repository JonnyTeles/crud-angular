import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { IProduct } from './product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-sucess']
    })
  }

  create(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.baseUrl, product).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e)))
  }

  postProduct(product: FormData): Observable<IProduct>{
    return this.http.post<IProduct>(`${this.baseUrl}`, product)
  }


  read(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e)))
  }

  readById(id: number): Observable<IProduct> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<IProduct>(url).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e)))
  }

  update(product: IProduct): Observable<IProduct> {
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<IProduct>(url, product)
  }

  delete(id: number): Observable<IProduct> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<IProduct>(url).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e)))
  }

  errorHandler(e: any): Observable<any> {
    console.log(e);
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY
  }
}
