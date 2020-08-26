import { Injectable } from '@angular/core';
import { FoodItem } from '../foodItem.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  //menu array
  private foodMenu:FoodItem[]= [

        new FoodItem("Veg Burger","These burgers are made from ingredients like beans, especially soybeans and tofu, nuts, grains, seeds or fungi such as mushrooms or mycoprotein. The patties that are the essence of a veggie burger have existed in various Eurasian cuisines for millennia, including in the form of disc-shaped grilled or fried meatballs or as koftas, a commonplace item in Indian cuisine.","https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRUpMn9z7o_vhknN8lEI56nHTxIt9fXnn0chw&usqp=CAU",40),
        new FoodItem("Cheese Pizza","Pizza cheese frequently consists of a blend of two or more cheeses, such as low-moisture Mozzarella or Provolone. Low-moisture Mozzarella was first manufactured in dairy factories in the Midwestern United States, and was originally called pizza cheese","https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSumAeAmbXCarojR2e9q2V8UYOZc2V8zIxdow&usqp=CAU",80),
        new FoodItem("Masala Pasta","It is made from grain flour, commonly wheat, mixed into a paste or dough, usually with water or eggs, and formed or cut into sheets or other shapes. It is usually cooked by boiling, baking or frying. Rice flour, or legumes such as beans or lentils, are sometimes used in place of wheat flour to yield a different flavour and texture, or as a gluten-free alternative. Pasta is a staple food ingredient of Italian cuisine.","https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS2UwBgLhZi_LVX96LEvkVOijtEN0MrbDAOrw&usqp=CAU",160),
        new FoodItem("Nachos","These classic Tex-Mex nachos are loaded to the MAX! Avoid soggy nachos by briefly baking them before topping with cheese, seasoned beef, refried beans, guacamole, and salsa. They're a great snack, party appetizer, or even casual weeknight dinner.","https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRuxWSGFEU6uEQ0ZWKyE0KcXnqKBfjoWoVi2Q&usqp=CAU",120)
        
  ];

  getFoodMenu()
  {
      return this.foodMenu.slice();
  }

  getFoodItem(index:number)
  {
      const i = this.foodMenu.findIndex(food=>food.foodId==index);
      return this.foodMenu[i];
  }


}
