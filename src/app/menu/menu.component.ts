import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FoodItem } from '../foodItem.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  foodMenu:FoodItem[] = [];

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
      
      this.foodMenu = this.dataService.getFoodMenu();
      console.log("FOod MEnu : ", this.foodMenu);
  }

}
