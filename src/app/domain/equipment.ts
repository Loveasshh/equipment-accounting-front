import {Category} from "../domain/category";

export class Equipment {
    id!: string;
    equipmentName!: string;
    equipmentDescription!: string;
    equipmentOrderNumber!: string;
    equipmentSerialNumber!: string;
    category!: Category;
}