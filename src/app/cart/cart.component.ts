import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { FoodItem } from '../foodItem.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  foodOrders:any;

  foodDetails = [];

  constructor(private orderService:OrderService,private dataService:DataService) {
   
   }


  ngOnInit(): void {
    
    this.foodOrders = JSON.parse(localStorage.getItem('orders'));

    this.orderService.orders.subscribe(result=>{
        this.foodOrders = result;
        });

    console.log("CART : ",this.foodOrders);

      //populating foodDetails array
      this.foodOrders.foodData.forEach(f=>{
        if(f.foodID!==null){
          let foodObj = this.dataService.getFoodItem(f.foodID);
          this.foodDetails.push({...foodObj,qty:f.foodQty});
        }
      })
      console.log("Food Details : ",this.foodDetails);


  }

  calculateSubTotal(id:number)
  {
    let subTotal = 0;
    //finding particular food ITEM
    this.foodDetails.forEach(food=>{
      if(food.foodId==id)
      {
        subTotal = food.qty * food.foodPrice;
        console.log("SUB TOTAL :",subTotal);
      }
    });
    return subTotal;
  }

  cancelOrder()
  {
    this.orderService.resetOrderData();
  }

}
