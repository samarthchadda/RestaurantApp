export class FoodItem
{
    //properties
    foodId:number;
    foodNm:string;
    foodPrice:number;
    foodImg:string;
    foodDesc:string;
    static id:number = 1;

    constructor(nm:string, desc:string, imgPath:string , price:number)
    {
        this.foodId = FoodItem.id;
        this.foodNm = nm;
        this.foodDesc = desc;
        this.foodImg = imgPath;
        this.foodPrice = price;
        
        //incrementing static counter
        FoodItem.id++;
    }
    
}