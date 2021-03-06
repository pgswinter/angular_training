import { FilterByBrandPipe } from "./../shared/filterByBrand.pipe";
import { AuthService } from "./../../index/shared/auth.service";
import { Product } from "./../model/product";
import { ProductService } from "./../shared/product.service";
import { Component, OnInit } from "@angular/core";
import { LoaderSpinnerService } from "../../modules/loader-spinner/loader-spinner";
import { ToastyConfig, ToastOptions, ToastyService } from "ng2-toasty";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  productList: Product[];

  brands = ["All", "Google", "Apple", "Samsung", "OnePlus", "Lenovo", "Nokia"];

  selectedBrand: "All";

  page = 1;
  constructor(
    public authService: AuthService,
    private productService: ProductService,
    private spinnerService: LoaderSpinnerService,
    private toastyConfig: ToastyConfig,
    private toastyService: ToastyService
  ) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.spinnerService.show();
    const x = this.productService.getProducts();
    x.snapshotChanges().subscribe(product => {
      this.spinnerService.hide();
      this.productList = [];
      product.forEach(element => {
        const y = element.payload.toJSON();
        y["$key"] = element.key;
        this.productList.push(y as Product);
      });
    });
  }

  removeProduct(key: string) {
    this.productService.deleteProduct(key);
  }

  addFavourite(product: Product) {
    this.productService.addFavouriteProduct(product);
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }
}
