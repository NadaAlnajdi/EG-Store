import { AuthService } from './../../services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { GlobalService} from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class productsComponent implements OnInit {
 products:any=[]
 loading:boolean=true
 isAdmin =false;

//  search: any[] = [...this.products] 


  constructor( private global:GlobalService,private userService:UserService,private authService: AuthService) { }
public apiUrl=environment.apiUrl
  ngOnInit(): void {
    this.getProducts()
  }
  getProducts(){
    this.global.getData().subscribe(data=>{
      console.log(data)
      this.products=data.data
      this.loading=false
      this.authService.adminFlag.subscribe(adminFlag=>{
        this.isAdmin = adminFlag
      })
    },
    (err)=>{
      console.log(err)
    },
    ()=>{
      this.loading=false
      console.log(this.loading)
    }
    )
  }
  addToCart(product:any){
    this.userService.addToCart(product._id,{ 
      name: product.name, 
      description: product.description, 
      price: product.price, 
      size: product.size, 
      category: product.category}).subscribe(res=>{
        console.log(res);
      })
  }

  deleteProduct(productId:string){
    this.global.deleteProduct(productId).subscribe(
      res=>this.getProducts()
    )
  }
 filter = (value:any) =>{
  this.products =  this.products.filter((fil:any)=>fil.category.includes(value))

}
 
}
