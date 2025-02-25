import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { CircleX } from "lucide-react";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function Popup({ open, dialogContentClass, onDialogClose, children, dialogClass, closeIcon }) {
	return (
		<Dialog
			style={{ background: "#30303049" }}
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={(e, reason) => {
				if (reason === "backdropClick" || reason === "escapeKeyDown") {
					return;
				} else {
					return onDialogClose(false);
				}
			}}
			aria-describedby="alert-dialog-slide-description"
			className={dialogClass}
		>
			<DialogContent className={dialogContentClass ? dialogContentClass : 'bg-white border  rounded-3xl w-full relative !px-6 !py-6 gap-5 flex flex-col dialog-close'}>
				{closeIcon &&
					<span onClick={() => onDialogClose(false)} className="close-popup absolute right-1 top-2.5 leading-none text-grey px-4 pt-2 pb-3 rounded-full cursor-pointer">
						<CircleX />
					</span>
				}
				{children}
			</DialogContent>
		</Dialog>
	);
}
