import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css'],
})
export class SingleComponent implements OnInit, AfterViewInit {
  productId: any;
  singleproduct: any;
  admin: boolean = false;
  constructor(
    private global: GlobalService,
    private router: Router,
    private activated: ActivatedRoute,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.admin = localStorage.getItem('role') === 'Admin';
    this.productId = this.activated.snapshot.paramMap.get('id');
    this.global.getsingle(this.productId).subscribe((product) => {
      this.singleproduct = product.data;
    });
  }
  ngAfterViewInit() {
    console.log({ admin: this.auth.adminFlag });
  }
  deleteProduct(): void {
    this.global.deleteProduct(this.productId).subscribe((rer) => {
      this.router.navigateByUrl('Products');
    });
  }
}
