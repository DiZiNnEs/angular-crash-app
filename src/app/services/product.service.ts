import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, delay, Observable, retry, tap, throwError} from "rxjs";
import {IProduct} from "../models/product";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient, private errorService: ErrorService) {
  }

  public products: IProduct[]

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products').pipe(
      delay(200),
      catchError(this.errorHandler.bind(this)),
      tap(prod => this.products = prod),
      retry(3))
  }

  create(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>('https://fakestoreapi.com/products', product).pipe(
      tap(prod => this.products.unshift(prod))
    )
  }

  errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
