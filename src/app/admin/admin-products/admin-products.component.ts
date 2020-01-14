import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products;
  subscription; 
  constructor(
    private productService: ProductService
  ) { 
    this.productService.getAll().subscribe((productList) => {
      this.products = productList;
    });
  
  }

  ngOnInit() {
 
  }

  delete(productId) {
    if(confirm('Are you sure want to delete it')){
      this.productService.delete(productId)
    }
  }

  filter(search) {
    console.log('search: ', search);

  }

}
