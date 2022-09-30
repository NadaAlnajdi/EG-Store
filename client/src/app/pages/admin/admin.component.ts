import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  img: any;
  isFailed = false;
  enteredCat = false;
  isSubmitted = false;
  clicked = false;
  formFlag = false;
  productId = null;
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    size: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(private _products: GlobalService, private router: Router) {}

  ngOnInit(): void {}
  get name() {
    return this.myForm.get('name');
  }
  get price() {
    return this.myForm.get('price');
  }
  get description() {
    return this.myForm.get('description');
  }
  get category() {
    return this.myForm.get('category');
  }
  get size() {
    return this.myForm.get('size');
  }

  handleAdd(): void {
    console.log(this.myForm.value);

    this._products.addProduct(this.myForm.value).subscribe(
      (data) => {
        console.log(data);
        this.productId = data.data._id;
        this.formFlag = true;
      },
      (err) => {
        console.log(err);
        this.isFailed = true;
        setTimeout(() => {
          this.isFailed = false;
        }, 3000);
      },
      () => {
        console.log('done');
        this.myForm.reset();
      }
    );
  }

  handleUpload(ev: any) {
    console.log(ev);
    this.img = ev.target.files[0];
  }
  handleSubmit() {
    let formData = new FormData();
    formData.append('img', this.img);
    this._products.userImage(formData, this.productId).subscribe((res) => {
      console.log('ss');
      this.router.navigateByUrl('Products');

      console.log(res);
    });
  }
}
