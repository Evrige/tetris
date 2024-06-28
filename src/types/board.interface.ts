export interface IBoard {
	rows: ICells[][]
	size: {
		rows: number
		columns: number
	}
}
export interface ICells {
	occupied: boolean
	className: string
}
