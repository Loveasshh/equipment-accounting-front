import { Timestamp } from "rxjs";
export class EquipmentMovingExcel {
    id!: number;
    Дата!: Timestamp<String>;
    Тип_Перемещения!: string;
    Наименование!: string;
    Заказной_номер!: string;
    Серийный_номер!: string;
    От_Кого!: string;
    Кому!: string;
    Описание!: string;
    Назначение!: string;
    Временно!: string;
    Дата_возврата!: string;
  }
  