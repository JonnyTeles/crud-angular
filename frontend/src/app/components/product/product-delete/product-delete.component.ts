import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { IProduct } from './../product.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: IProduct = {} as IProduct

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  deletedProduct = this.fb.group({
    id: [{value: null, disabled: true}, Validators.required],
    name: [{value: '', disabled: true}, Validators.required],
    price: [{value: '', disabled: true}, Validators.required]
  })

  public get name() {
    return this.deletedProduct.get('name')!
  }

  public get price() {
    return this.deletedProduct.get('price')!
  }

  public get id() {
    return this.deletedProduct.get('id')
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe((product) => {
      this.product = product;
    });
  }

  deleteProduct(): void {
    this.productService.delete(this.product.id).subscribe(() => {
      this.productService.showMessage("Produto excluido com sucesso!");
      this.router.navigate(["/products"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }

}
