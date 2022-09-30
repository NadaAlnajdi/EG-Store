import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productInCart:any[]=[]
  public apiUrl=environment.apiUrl
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getItems()
  }

  getItems(){
    this.userService.getProductFromCart().subscribe(
      res=> {
        this.productInCart = res.data
        console.log(this.productInCart);
      },
      err=>console.log(err)
    )
  }
  removeFromCart(cartItemId:string){
    this.userService.removeProductFromCart(cartItemId).subscribe(
      res=>this.getItems(),
      err=>console.log(err)
    )
  }
  clearCart(){
    this.userService.clearCart().subscribe(
      res=>this.getItems(),
      err=>console.log(err)
    )
  }
}
