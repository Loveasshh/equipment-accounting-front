import {User} from "../domain/user";
import {Equipment} from "../domain/equipment";
import { Timestamp } from "rxjs";

export class MovingEquipment {
    id!: number;
    user!: User;
    equipment!: Equipment | any;
    serialNumber!: string;
    orderNumber!: string;
    movingTo!: string;
    movingFrom!: string;
    movingDate!: Timestamp<String>;
    movingType!: string;
    purpose!: string;
    isTemporary!: boolean;
    description!: string;
  }
  