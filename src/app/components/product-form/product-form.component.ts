import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private productService: ProductService,
    private _snackBar: MatSnackBar
  ) {}
  @Input()
  isEdit: boolean;
  serachVisible: boolean;
  productForm: FormGroup;

  ngOnInit(): void {
    this.productForm = new FormGroup(
      {
        _id: new FormControl(''),
        productId: new FormControl(
          { value: '', disabled: !this.isEdit },
          Validators.required
        ),
        quantity: new FormControl({ value: '', disabled: !this.isEdit }, [
          Validators.required,
          Validators.pattern(/^[0-9]*$/)
        ]),
        productName: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9\s]*$/)
        ]),
        costPrice: new FormControl({ value: '', disabled: !this.isEdit }, [
          Validators.required,
          Validators.pattern(/^[0-9]*$/)
        ]),
        sellingPrice: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[0-9]*$/)
        ])
      },
      control => this.sellingPriceNotLTCostPriceValidator(control)
    );
    this.serachVisible = this.isEdit;
    this.productService.productSearched.subscribe(product => {
      this.serachVisible = true;
      this.productForm.reset();
      this.productForm.patchValue(product);
    });
  }

  sellingPriceNotLTCostPriceValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (
      this.productForm &&
      parseInt(this.productForm.getRawValue().sellingPrice) <
        parseInt(this.productForm.getRawValue().costPrice)
    ) {
      return { spLTcp: true };
    }
    return null;
  }

  onSubmit() {
    this.productService.addProduct(this.productForm.value).subscribe(
      (result: any) => {
        this.openSnackBar(result.message, result.status);

        this.productForm.reset();
        for (const field in this.productForm.controls) {
          this.productForm.controls[field].clearValidators();
          this.productForm.controls[field].updateValueAndValidity();
        }
      },
      (error: any) => {
        this.openSnackBar(error.message, error.status);
      }
    );
  }

  updateProduct(e) {
    if (e.which == 13 && !this.isEdit && this.productForm.valid) {
      this.productService.updateProduct(this.productForm.value).subscribe(
        (result: any) => {
          this.openSnackBar(result.message, result.status);
        },
        (error: any) => {
          this.openSnackBar(error.message, error.status);
        }
      );
    }
  }

  openSnackBar(message, msgStatus) {
    this._snackBar.open(message, msgStatus, {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }
}
