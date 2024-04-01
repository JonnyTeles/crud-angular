import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { Router } from '@angular/router';
import { IProduct } from './../product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  constructor(private productService: ProductService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, Validators.required]
    })
  }

  public product: IProduct = {} as IProduct
  public productForm: FormGroup
  public get name() {
    return this.productForm.get('name')!
  }

  public get price() {
    return this.productForm.get('price')!
  }

  createProduct() {
    if (this.productForm.invalid) {
      return
    }

    this.productService.postProduct(this.productForm.value).subscribe(() => {
      this.productService.showMessage('Produto Criado!')
      this.router.navigate(['/products'])
    })

  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
