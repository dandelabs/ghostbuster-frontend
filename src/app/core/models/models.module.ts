export interface ProductionStatus {
  id: number;
  description: string;
  statusId: number;
}

export interface Item {
  id: number;
  code: string;
  description: string;
  statusId: number;
}

export interface Machine {
  id: number;
  name: string;
  statusIdPrimary: number;
  statusIdSecondary: number;
  statusId: number;
}

export interface ProductsProcess {
  id: number;
  itemId: number;
  fromStatusId: number;
  toStatusId: number;
  machineId: number;
  stdTime: number;
  statusId: number;
}

export interface UserManager {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  nick_name: string;
  password: string;
  salt: string;
  statusId: number;
  createdDate: Date;
  updatedDate: Date;
  is_active: boolean;
  dateofbirth: Date;
  last_login: Date;
}

export interface ChangeoverCost {
  id: number;
  fromStatusId: number;
  toStatusId: number;
  time: number;
  statusId: number;
}

export interface DowntimeType {
  id: number;
  name: string;
  description: string;
  subject: string;
  statusId: number;
}

export interface Order {
  id: number;
  customerName: string;
  dueDate: Date;
  partiallyCancel: number;
  statusId: number;
  isBackOrder: boolean;
  createdDate: Date;
  modifiedDate: Date;
  insertedDate: Date;
  priorityStatusId: number;
  items: OrderDetails;
}

export interface OrderDetails {
  id: number;
  orderId: number;
  quantity: number;
  quantityReceived: number;
  receivedDate: Date;
  insertedDate: Date;
}

export interface Downtime {
  id: number;
  detailId: number;
  downtimeTypeId: number;
  itemId: number;
  userId: number;
  statusId: number;
  startTime: number;
  finishTime: number;
}

export interface OrderStatus {
  id: number;
  description: string;
  statusId: number;
}

export interface Production {
  id: number;
  detailId: number;
  itemId: number;
  userId: number;
  statusId: number;
  startTime: Date;
  finishTime: Date;
  unitsManufactured: number;
  items: OrderDetails;
}

export interface Schedule {
  id: number;
  orderItemProcess: string;
  detailId: number;
  statusId: number;
  manufacturingDate: Date;
  creattionDate: Date;
  quantity: number;
  items: OrderDetails
}

export interface PeriodicElement{}