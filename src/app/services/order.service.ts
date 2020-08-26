import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { FoodItem } from '../foodItem.model';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    //initial order data
  private orderData = {
    totalPrice:0,
    foodData:[{
      foodQty:0,
      foodID:null,
    }]
  };

  foodObj:FoodItem;

  //Subject
  orders = new BehaviorSubject(this.orderData);

  constructor(private dataService:DataService) {
    
    this.orderData = JSON.parse(localStorage.getItem('orders'));
    this.orders.next(this.orderData);

   }

  placeOrder(foodId:number, qty:number)
  { 
      this.foodObj = this.dataService.getFoodItem(foodId);
      console.log("FOOD ITEM : ",this.foodObj,"Quantity : ", qty);


    let check = 0;

    let index  =  this.orderData.foodData.findIndex(f=>f.foodID === foodId);
    console.log(index);

     //  //if new item is already present in Orders object
     if(index!== -1)
     {
         //increase quantity only
       this.orderData.foodData[index].foodQty += qty;
       console.log("Already Exists"); 
     }else{
        //pushing item into orderData's foodData array
       this.orderData.foodData.push({
        foodQty:qty,
        foodID:foodId
      });
     }

    //  this.orderData.foodData.forEach(food=>{
       
    //  //if new item is already present in Orders object
    //    if(food.foodID == foodId){
    //       check = 1;      
                 
    //    }
    //   //  else{
    //   //     check = 0;           
    //   //  }
    //  });

    //  if(check==1)
    //  {
    //    //increase quantity only
    //    this.orderData.foodData[foodId].foodQty += qty;
    //    console.log("Already Exists");
    //  }
    //  else
    //  {
    //    //pushing item into orderData's foodData array
    //    this.orderData.foodData.push({
    //     foodQty:qty,
    //     foodID:foodId
    //   });
    //  }
   
      this.calculateTotalPrice();      
     
      localStorage.setItem('orders',JSON.stringify(this.orderData));
      //emitting subject
      this.orders.next(this.orderData);

  }


  private calculateTotalPrice()
  {
    let total = 0;
    this.orderData.foodData.forEach(food=>{

      if(food.foodID!==null){

          let foodObj = this.dataService.getFoodItem(food.foodID);
          console.log("Food : ",food);
          const {foodQty} = food;
          console.log("Quantity : ",foodQty);
          const price = foodObj.foodPrice;
          console.log("Price : ",price);

          total += foodQty*price;

      }

    });

    this.orderData.totalPrice = total;
    console.log("TOtal PRICE : ",this.orderData.totalPrice);
    
  }

  resetOrderData()
  {
    this.orderData = {
      totalPrice:0,
      foodData:[{
        foodQty:0,
        foodID:null  
      }] 
    };

    localStorage.setItem('orders',JSON.stringify(this.orderData));
    //emitting subject
    this.orders.next(this.orderData);

  }



}
