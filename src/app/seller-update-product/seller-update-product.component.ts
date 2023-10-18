import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productMessage: string | undefined;
  productData: undefined | product
  constructor(private activatedRoute: ActivatedRoute, private route: Router, private product: ProductService) { }

  ngOnInit(): void {
    let productId = this.activatedRoute.snapshot.paramMap.get('id');
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((data) => {
      this.productData = data
    })
  }

  submit(data: product) {
    if(this.productData) {
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = "Product has updated"
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
      this.route.navigate(['/seller-home']);
    }, 3000);
  }

}
