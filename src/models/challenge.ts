export interface Challenge {
  id: string
  title: string
  // TODO: Type deadline
  deadline: string | Date // ??
  price: number
  accessMode: "public" | "private"
}
