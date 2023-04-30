import { Component } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {
  constructor(public productService: ProductService, public modalService: ModalService) {}

  title = 'crash course angular app';
  loading = false;
  term = '';
  ngOnInit(): void {
    this.loading = true;
    this.productService.getAll().subscribe(() => this.loading = false)
  }
}
