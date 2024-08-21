import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { SharedModule } from '../shared/shared.module';
import { AddProductComponent } from './add-product.component';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  // let dialogRef: MatDialogRef<AddProductComponent>;
  let dialogRef = jasmine.createSpyObj<MatDialogRef<AddProductComponent>>(
    'MatDialogRef',
    ['close']
  );
  let matSnackBar = jasmine.createSpyObj('MatSnackbar', ['open', 'close']);
  let mockProductService = jasmine.createSpyObj<ProductsService>(
    'ProductsService',
    ['updateProduct', 'saveProduct']
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [SharedModule, NoopAnimationsModule],
      providers: [
        { provide: MatSnackBar, useValue: matSnackBar },
        { provide: ProductsService, useValue: mockProductService },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    matSnackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init the form', () => {
    component.ngOnInit();
    expect(component.productForm).toBeTruthy();
  });

  describe('should test add product functionality', () => {
    it('should call the saveProduct to add new product', () => {
      const data: Product = {
        title: 'Test Product',
        description: 'Test description',
        price: '19.20',
        category: 'Test category',
      };
      component.productForm.patchValue(data);
      mockProductService.saveProduct.and.returnValue(
        of({} as never as Product)
      );
      component.saveProduct();
      expect(mockProductService.saveProduct).toHaveBeenCalledWith(data);
      expect(matSnackBar.open).toHaveBeenCalledWith(
        'Added Successfully!...',
        '',
        {
          duration: 3000,
        }
      );
      dialogRef.close.and.callThrough();

    });

    it('should test the saveProduct for failure while add a new product', () => {
      const data: Product = {
        title: 'Test Product',
        description: 'Test description',
        price: '19.20',
        category: 'Test category',
      };
      const error = new Error('Error while adding a new product');
      component.productForm.patchValue(data);
      mockProductService.saveProduct.and.returnValue((throwError(() => error)));
      component.saveProduct();
      expect(mockProductService.saveProduct).toHaveBeenCalledWith(data);
      expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '', {
        duration: 3000
      });
    });
  });

  describe('should test edit product functionality', () => {
    it('should set the form controls to the correct values when data is provided', () => {
      const data: Product = {
        id: '1',
        title: 'Test Product',
        description: 'Test description',
        price: '19.20',
        category: 'Test category'
      };
      component.data = data;
      component.ngOnInit();
    });

    it('should call the saveProduct while editing the product', () => {
      const data: Product = {
        id: '1',
        title: 'Test Product',
        description: 'Test description',
        price: '19.20',
        category: 'Test category'
      };
      component.data = data;
      component.productForm.patchValue(data);
      mockProductService.updateProduct.and.returnValue(
        of({} as never as Product)
      );
      component.saveProduct();
      expect(mockProductService.updateProduct).toHaveBeenCalledWith(data);
      expect(matSnackBar.open).toHaveBeenCalledWith(
        'Updated Successfully!...',
        '',
        {
          duration: 3000,
        }
      );
      dialogRef.close.and.callThrough();
    });

    it('should test the saveProduct for failure while update a product', () => {
      const data: Product = {
        id: '1',
        title: 'Test Product',
        description: 'Test description',
        price: '19.20',
        category: 'Test category'
      };
      component.data = data;
      const error = new Error('Error while adding a new product');
      component.productForm.patchValue(data);
      mockProductService.updateProduct.and.returnValue((throwError(() => error)));
      component.saveProduct();
      expect(mockProductService.updateProduct).toHaveBeenCalledWith(data);
      expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '', {
        duration: 3000
      });
    });
  });
});
