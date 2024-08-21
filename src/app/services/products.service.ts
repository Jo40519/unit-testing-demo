import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseAPI = environment.baseAPI;
  constructor(private http: HttpClient) {}

  /**
   * @description Trás todos os produtos da API.
   * @returns  {Observable<Product[]>}
   * @memberof ProductsService
   */
  getProducts() {
    return this.http.get<Product[]>(`${this.baseAPI}products`);
  }

  /**
   * @description Salva um novo produto na API.
   * @param {Product} product
   * @returns {Observable<Product>}
   * @memberof ProductsService
   */
  saveProduct(product: Product) {
    return this.http.post<Product>(
      `${this.baseAPI}products`,
      product
    );
  }

  /**
   * @description Deleta um produto da API.
   * @param {number} id
   * @returns {Observable<Product>}
   * @memberof ProductsService
   */
  deleteProduct(id: number) {
    return this.http.delete<Product>(`${this.baseAPI}products/${id}`);
  }

  /**
   * @description Atualiza um produto na API.
   * @param {Product} product
   * @returns {Observable<Product>}
   * @memberof ProductsService
   */
  updateProduct(product: Product) {
    return this.http.put<Product>(
      `${this.baseAPI}products/${product.id}`,
      product
    );
  }
}
