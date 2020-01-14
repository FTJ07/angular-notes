import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products = [];
  filteredProducts;
  categories$; 
  category;
  cart: any;
  subscription: any;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute
  ) {
    this.categories$ = this.categoryService.getAll();
    this.productService.getAll().subscribe((products) => {
      this.products = products;

      this.route.queryParamMap.subscribe((params) => {
        this.category = params.get('cateogry');
        this.filteredProducts = (this.category) ?
        this.products.filter((p) => p.category.toLowerCase() === this.category.toLowerCase()) :
        this.products;
      })
    
      
    });

   }

  async ngOnInit() {
   this.subscription = (await this.shoppingCartService.getCart()).valueChanges().subscribe((cart) => this.cart = cart);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
