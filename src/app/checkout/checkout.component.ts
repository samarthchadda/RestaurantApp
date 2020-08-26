import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { DataService } from '../services/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  foodOrders:any;

  foodDetails = [];
  totalAmt:number;

  constructor(private orderService:OrderService, private dataService:DataService, private routerBtn:Router,
    private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.foodOrders = JSON.parse(localStorage.getItem('orders'));

    this.orderService.orders.subscribe(result=>{
        this.foodOrders = result;
       
        });

        this.totalAmt = this.foodOrders.totalPrice;

    //populating foodDetails array
    this.foodOrders.foodData.forEach(f=>{
      if(f.foodID!==null){
        let foodObj = this.dataService.getFoodItem(f.foodID);
        this.foodDetails.push({...foodObj,qty:f.foodQty});
      }
    })
    console.log("Food Details : ",this.foodDetails);
  }

  addTip(e:any)
  {
    let total = this.foodOrders.totalPrice;
    let tipAmt = total*0.1;
    if(e.target.checked)
    {
      total = total + tipAmt;
           
    }
    if(!e.target.checked){
      total = this.totalAmt;
    }

    this.foodOrders.totalPrice = total;
    // console.log("FInal Amount : ", finalAmt);
    localStorage.setItem('orders',JSON.stringify(this.foodOrders));
    //emitting subject
    this.orderService.orders.next(this.foodOrders);
  }
 
  onCheckout()
  {
      this.spinner.show();
      setTimeout(()=>{
          // //TODO hide spinner
        this.spinner.hide();
        this.navigateToHome();
      },2000)
    
  }

  private navigateToHome()
  {    
    alert("Order Placed...Package will be delivered Shortly!!!!")
    this.orderService.resetOrderData();
    this.routerBtn.navigate(['']);
  }

}
