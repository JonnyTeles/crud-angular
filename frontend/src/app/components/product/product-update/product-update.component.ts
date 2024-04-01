import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './../product.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {


  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder,) { }
  
  public product: IProduct = {} as IProduct
  public productForm: FormGroup

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.readById(Number(id)).subscribe(product => {
      this.product = product
      this.productForm = this.fb.group({
        name: [product.name, Validators.required],
        price: [product.price, Validators.required],
        id: [product.id]
      })
    })
  }

  public get name(){
    return this.productForm.get('name')!
  }
  
  public get price(){
    return this.productForm.get('price')!
  }

  updateProduct(): void {
    if(this.productForm.invalid){
      return 
    }
    if(this.productForm.valid){
    this.productService.update(this.productForm.value).subscribe(() => {
      this.productService.showMessage('Produto alterado com sucesso!')
      this.router.navigate(['/products'])
    })
  }
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

}
