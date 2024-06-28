import {ICells} from "../types/board.interface.ts";
import "./BoardCell.scss";
const BoardCell = ({cell}: {cell: ICells}) => {

	return (
		<div className={`w-auto rounded-md relative ${cell.className}`}>
			<div className="Sparkle"></div>
		</div>
	);
};

export default BoardCell;