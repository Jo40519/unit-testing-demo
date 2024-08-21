import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpController: HttpTestingController;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getProducts', () => {
    const spy = spyOn(http, 'get').and.returnValue(of({}));
    service.getProducts();
    expect(spy).toHaveBeenCalled();
  });

  it('should test saveProducts', () => {
    const spy = spyOn(http, 'post').and.returnValue(of({}));
    service.saveProduct({
      id: '1',
      category: 'test',
      description: 'test',
      image: 'test',
      price: '',
      title: 'test',
    });
    expect(spy).toHaveBeenCalled();
  });

  it('should test updateProduct', () => {
    const spy = spyOn(http, 'put').and.returnValue(of({}));
    service.updateProduct({
      id: '1',
      category: 'test',
      description: 'test',
      image: 'test',
      price: '',
      title: 'test',
    });

    expect(spy).toHaveBeenCalled();
  });

  it('should test deleteProduct', () => {
    const spy = spyOn(http, 'delete').and.returnValue(of({}));
    service.deleteProduct(1);
    expect(spy).toHaveBeenCalled();
  });
});
