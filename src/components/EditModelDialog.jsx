import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

export const EditModelDialog = ({ open, setOpen, model }) => {
	const [img, setImg] = useState("");
	const [imgSelect, setImgSelect] = useState("");
	const [visibility, setVisibility] = useState("");
	const [loading, setLoading] = useState(false);

	const fileInput = useRef();

	const handleClose = () => {
		setOpen(false);
	};

	const handleUpdate = async () => {
		try {
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (model?.img) setImg(model?.img);
		if (model?.visibility) setVisibility(model.visibility);
	}, [model]);

	console.log(imgSelect);
	return (
		<div>
			<Dialog open={open} onClose={() => {}}>
				<DialogTitle>
					{"Edit Model :"} {model?.name && `${model.name}`}
				</DialogTitle>
				<DialogContent>
					{/* <TextField
						label="Image"
						name="Image"
						value={img}
						onChange={(e) => {
							setImg(e.target.value);
						}}
						sx={{ m: 2, ml: 0, minWidth: "300px" }}
						size="small"
						fullWidth
					/> */}

					<div>
						<Button
							variant="contained"
							color="primary"
							onClick={() => fileInput.current.click()}
							size="small"
							sx={{ m: 2, ml: 0, mb: 1, minWidth: "300px" }}
						>
							select Image
						</Button>

						<input
							ref={fileInput}
							type="file"
							multiple={false}
							style={{ display: "none" }}
							// value={imgSelect}
							onChange={(e) => {
								setImgSelect(e.target.files[0]);
							}}
						/>
					</div>
					<Box
						sx={{
							mb: 1,
						}}
					>
						{imgSelect?.name && `Selected image : ${imgSelect.name}`}
					</Box>
					<FormControl fullWidth>
						{/* <InputLabel id="demo-simple-select-label">Visibility</InputLabel> */}
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={visibility}
							// label="Visibility"
							onChange={(e) => {
								setVisibility(e.target.value);
							}}
							size="small"
							placeholder="visibility"
						>
							<MenuItem value={"public"}>Public</MenuItem>
							<MenuItem value={"private"}>Private</MenuItem>
						</Select>
					</FormControl>
					<DialogContentText sx={{ ml: 0.5 }}>
						{/* Enter wallet address to add member to{" "}
						{addMemberState?.name ? `${addMemberState.name}` : "current"} space. */}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose} variant="contained">
						Close
					</Button>
					{loading ? (
						<Button color="primary" variant="contained">
							Loading...
						</Button>
					) : (
						<Button
							onClick={handleUpdate}
							autoFocus
							variant="contained"
							disabled={!visibility}
						>
							Update Module
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</div>
	);
};
