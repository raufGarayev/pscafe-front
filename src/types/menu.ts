export type MenuItem = {
    id: number
    name: string
    price: number
}

export type Order = {
    menuId: number
    amount: number
    totalPrice: number
    name?: string
  }
  