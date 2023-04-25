export class Product{
  name!:string;
  amount?:number;
  cost!:number;
}

export const mockup:Product[] =
  [
    {name:'Труба 1мм', amount:5, cost: 50 },
    {name:'Труба 5мм', amount:10, cost: 70 },
    {name:'Труба 10мм', amount:7, cost: 60 },
    {name:'Уголок пластик',  amount:12, cost: 30 },
    {name:'Уголок черный пластик', amount:14, cost: 35 },
    {name:'Бойлер Boshe', amount:12, cost: 34999 },
    {name:'Аллюмиевый радиатор авторский Buche', amount:3, cost: 12500 },
    {name:'Аллюмиевый радиатор авторский  черный Buche', amount:1, cost: 11290 },
    {name:'Металлический радиатор черный Buche 8 секций', amount:5, cost: 6999 },
    {name:'Металлический радиатор черный Buche 6 секций', amount:6, cost: 7999 },
    {name:'Металлический радиатор белый Buche 4 секций', amount:13, cost: 3999 },
  ]
