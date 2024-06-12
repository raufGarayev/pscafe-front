export interface Table {
  id: number
  name: string
  price: number
  onOffPrice: number
}

export interface RunningTable extends Table {
  id: number
  tableId: number
  startTime: string
  orders: any[]
  tariffId: number
  duration: number
}
