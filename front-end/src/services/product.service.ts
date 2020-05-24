import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vendor } from 'src/models/vendor.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductService {

  dataChange: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  products: Array<Product>;
  tempProduct: Product;
  vendors: Array<Vendor>;
  localVendor: Vendor;
  log: any;

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {
    this.products = [];
    this.vendors = [];
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('mSessionId'),
    })
  };

  get data(): Product[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  // To get a list of Products
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      environment.server + '/products', this.httpOptions);
  }

  // To get a list of all Products to table on create-product.component
  getAllProducts() {
    this.httpClient.get<Product[]>(environment.server + '/products', this.httpOptions).subscribe((data) => {
       this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        this.snackBar.open('Error occurred during this process', 'RETRY', { duration: 3000 });
        console.log(error.name + ' ' + error.message);
      });
  }


  // Get a specific Product from the Store
  getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${environment.server}/product/${id}`, this.httpOptions)
      .pipe();
  }

  // To update for getById
  updateById(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${environment.server}/product/${product._id}`, product, this.httpOptions)
      .pipe();
  }

  // To add a new Product
  addProduct(product: Product): void {
    this.httpClient.post(environment.server + '/product/add', product, this.httpOptions).subscribe(() => {
      this.dialogData = product;
      this.snackBar.open('The Product was Successifuly created ', '', { duration: 4000 });
    },
      (err: HttpErrorResponse) => {
        this.snackBar.open('Error occurred during this process', 'RETRY', { duration: 4000 });
        console.log(err);
      });
  }

  // To upadate a Product by id
  updateProduct(product: Product): void {
    this.httpClient.put(environment.server + '/' + product._id , product, this.httpOptions).subscribe(() => {
      this.dialogData = product;
      this.snackBar.open('The Product was Successifuly updated', '', { duration: 4000 });
    },
      (err: HttpErrorResponse) => {
        this.snackBar.open('Error occurred during this process ', 'RETRY', { duration: 4000 });
        console.log(err);
      });
  }

  // To delete a Product by id
  deleteProduct(product: Product): void {
    this.httpClient.request('delete', environment.server + '/' + product._id, this.httpOptions )
      .subscribe(() => {
        this.snackBar.open('The Product was Successifuly deleted', '', { duration: 4000 });
      },
        (err: HttpErrorResponse) => {
          this.snackBar.open('Error occurred this process', 'RETRY', { duration: 4000 });
          console.log(err);
        }
      );
  }

  // To set Quantity of the product by id locally
  changeQuantity(product: Product): Observable<Product> {
    this.getProductById(product._id)
      .subscribe(
        (data: Product) => {
          if (this.products.length === 0) {
            this.tempProduct = new Product();
            this.tempProduct._id = data._id;
            this.tempProduct.quantity =  product.quantity + 1;
            this.tempProduct.name = product.name;
            this.tempProduct.description = product.description;
            this.tempProduct.price = product.price;
            this.products.push(this.tempProduct);

          } else if (this.products.length > 0) {
            this.tempProduct = new Product();
            this.tempProduct._id = data._id;
            this.tempProduct.quantity =  product.quantity + 1;
            this.tempProduct.name = product.name;
            this.tempProduct.description = product.description;
            this.tempProduct.price = product.price;

            if (this.products.some(e => e._id === data._id)) {
              this.products.filter((item) => {
                if (item._id === data._id) {
                  item.quantity = item.quantity + 1;
                }
              });
            } else {
              this.products.push(this.tempProduct);
            }
          }

          this.products.map(item => {
            if (item._id === data._id) {
              product.quantity = item.quantity;
              this.onSelectedProducts(item);
            }
          });
        });
    return new Observable((observer) => {
      observer.next(product),
        observer.complete();
    });
  }

  onCleanList(product: Product): Observable<Product> {
    if (this.products !== null) {
      this.products.map((element) => {
        if (element._id === product._id) {
          element.quantity = element.quantity - 1;
        }
        this.products.map(item => {
          if (item._id === product._id && item.quantity >= 0) {
            product.quantity = item.quantity;
            this.onSelectedProducts(item);
          }
        });
      });
    }
    return new Observable((observer) => {
      observer.next(product),
        observer.complete();
    });
  }

  onCleanListVendor(vendor: Vendor) {
    if (this.vendors !== null) {
      this.vendors.splice(this.vendors.indexOf(this.vendors.find(element => element._id === vendor._id)), 1);
    }
  }
  // To set vendor
  onSelectedProducts(product: Product) {
    this.getProductById(product._id)
      .subscribe(
        (data: Product) => {
          if (this.vendors.length === 0) {
            this.localVendor = new Vendor();
            this.localVendor.productId = data._id;
            this.localVendor.amount = product.quantity;
            this.localVendor.total = product.quantity * product.price;
            this.vendors.push(this.localVendor);

          } else if (this.vendors.length > 0) {
            this.localVendor = new Vendor();
            this.localVendor.productId = data._id;
            this.localVendor.amount = product.quantity;
            this.localVendor.total = product.quantity * product.price;

            if (this.vendors.some(e => e.productId === data._id)) {
              this.vendors.filter((item) => {
                if (item.productId === data._id) {
                  item.amount = product.quantity;
                  item.total = product.quantity * product.price;
                }

              });
            } else {
              this.vendors.push(this.localVendor);
            }
          }
        });

  }

  onBackVendor(): Observable<Vendor[]> {
    return new Observable((observer) => {
      if (this.vendors != null) {
        observer.next(this.vendors),
          observer.complete();
      } else {
        console.log('vendor is empty!');
      }
    });
  }
}
