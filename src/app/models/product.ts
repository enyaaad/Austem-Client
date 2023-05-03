export class Product{
  id!:number;
  name!:string;
  amount?:number;
  cost?:number;
  isSelected!:boolean;
}

export const mockup:Product[] =
  [
    {id:1,name:'Труба 1мм', amount:5, cost: 50, isSelected:false },
    {id:2,name:'Труба 5мм', amount:10, cost: 70, isSelected:false },
    {id:3,name:'Труба 10мм', amount:7, cost: 60, isSelected:false },
    {id:4,name:'Уголок пластик',  amount:12, cost: 30, isSelected:false },
    {id:5,name:'Уголок черный пластик', amount:14, cost: 35, isSelected:false },
    {id:6,name:'Бойлер Boshe', amount:12, cost: 34999, isSelected:false },
    {id:7,name:'Аллюмиевый радиатор авторский Buche', amount:3, cost: 12500, isSelected:false },
    {id:8,name:'Аллюмиевый радиатор авторский  черный Buche', amount:1, cost: 11290, isSelected:false },
    {id:9,name:'Металлический радиатор черный Buche 8 секций', amount:5, cost: 6999, isSelected:false },
    {id:10,name:'Металлический радиатор черный Buche 6 секций', amount:6, cost: 7999, isSelected:false },
    {id:11,name:'Металлический радиатор белый Buche 4 секций', amount:13, cost: 3999, isSelected:false },
    {id:12,name:'Металлический радиатор белый Buche 4 секций', amount:13, cost: 3999, isSelected:false },
    {id:13,name:'Металлический радиатор белый Buche 4 секций', amount:13, cost: 1234 , isSelected:false},
    {id:14,name:'Металлический радиатор белый Buche 4 секций', amount:13, cost: 45234, isSelected:false },
    {id:15,name:'Аллюмиевый авторский радиатор черный Boshe 6 секций', amount:13, cost: 23425 , isSelected:false},
    {id:16,name:'Металлический радиатор белый Buche 4 секций', amount:13, cost: 3454 , isSelected:false},
  ]
