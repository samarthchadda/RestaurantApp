import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FoodItem } from 'src/app/foodItem.model';
import { DataService } from 'src/app/services/data.service';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  id:number;
  foodItem:FoodItem;

  quantity:number = 1;

  constructor(private route:ActivatedRoute, private dataService:DataService,private orderService:OrderService) { }

  ngOnInit(): void {

    this.route.params.subscribe((newParams:Params)=>{

        this.id = newParams['id'];
        console.log("ID(in item component):",this.id);
        
        //retrieving particular Food Item
        this.foodItem = this.dataService.getFoodItem(this.id);

        //resetting the quantity(whenever new food item is loaded)
        this.quantity = 1;

    });

  }

  increase()
  {
    this.quantity++;
    console.log("Quantity : ", this.quantity);

  }

  decrease()
  {
    this.quantity--;
    if(this.quantity < 1)
    {
      this.quantity = 1;
    }
    console.log("Quantity : ", this.quantity);

  }

  placeOrder()
  {
    console.log("ITEM ID:", this.id);
    this.orderService.placeOrder(this.id,this.quantity);
  }

}
