import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$; 
  product = {};
  id;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.categories$ = this.categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
      this.productService.getById(this.id).subscribe((product)=>{
        this.product = product;
      })
      
    }
  }

  ngOnInit() {
   
  }

  save(product: FormGroup) {
    if(product.invalid) {
      product.controls['title'].setErrors({required: true})
      return;
    }
   
    if(this.id) this.productService.update(this.id, product.value);
    else {
       this.productService.create(product.value)
    }
    this.router.navigate(['/admin/products'])
  }

}
