export interface ApiResponce {
    dato: MovingEquipment[];
  }
  export interface MovingEquipment {
    id: number;
    User: User;
    Equipment: Equipment;
    serialNumber: string;
    orderNumber: string;
    movingTo: string;
    movingFrom: string;
    purpose: string;
    isTemporary: boolean;
    description: string;
  }
  export interface User {
    id: number;
    username: string;
    password: string;
    roles: [{
      id: number;
      name: string;
    }];
  }
  export interface Equipment {
    id: string;
    equipmentName: string;
    equipmentDescription: string;
    equipmentOrderNumber: string;
    equipmentSerialNumber: string;
    category: Category;
  }
  export interface Category {
    id: number;
    name: string;
  }