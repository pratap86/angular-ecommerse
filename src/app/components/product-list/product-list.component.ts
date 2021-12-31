import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!: Product[];
  currentProductCategoryId!: number;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe( () =>{
      this.listProducts();
    });
  }

  listProducts() {
    // check if 'id' parameter is available
    const hasProductCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasProductCategoryId){
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentProductCategoryId = +this.route.snapshot.paramMap.get('id');

    }
    else{
      this.currentProductCategoryId = 1;
    }
    this.productService.getproductList(this.currentProductCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
