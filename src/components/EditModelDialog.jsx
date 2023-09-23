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
import { toast } from "react-toastify";
import { updateTemplate } from "../api/template";
import { NftStorageHttpService } from "../utils/nftStorage";

export const EditModelDialog = ({ open, setOpen, model, reGet }) => {
	const nftStoage = new NftStorageHttpService();
	const [img, setImg] = useState("");
	const [newImgUrl, setNewImgUrl] = useState("");
	const [imgSelect, setImgSelect] = useState("");
	const [visibility, setVisibility] = useState("");
	const [loading, setLoading] = useState(false);

	const fileInput = useRef();

	const handleClose = () => {
		setImgSelect("");
		setNewImgUrl("");
		reGet();
		setOpen(false);
	};

	const handleUpdate = async () => {
		try {
			const res = await updateTemplate({
				img: newImgUrl ? `https://ipfs.io/ipfs${newImgUrl}` : img,
				visibility,
				id: model._id,
			});
			if (res?.ok) {
				toast("Successfully updated thee module 🥳", { type: "success" });
				handleClose();
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (model?.img) setImg(model?.img);
		if (model?.visibility) setVisibility(model.visibility);
	}, [model]);

	console.log(imgSelect);

	const handleUploadImage = async (e) => {
		setLoading(true);
		e.preventDefault();
		if (imgSelect) {
			const res = await nftStoage.pinFileToIPFS(imgSelect);
			if (res) {
				setNewImgUrl(res);
			}
		} else {
			toast("Kindly select an Image to upload", { type: "error" });
		}
		setLoading(false);
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			if (file.size <= 20 * 1024 * 1024) {
				// 20MB limit
				setImgSelect(file);
				setNewImgUrl("");
			} else {
				setImgSelect(null);
				toast("Image size exceeds 20MB", { type: "error" });
			}
		}
	};

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
							accept="image/*"
							multiple={false}
							style={{ display: "none" }}
							onChange={handleImageChange}
						/>
					</div>
					<Box
						sx={{
							mb: 1,
						}}
					>
						{imgSelect?.name && `Selected image : ${imgSelect.name}`}
						{imgSelect?.name && newImgUrl === "" && !loading && (
							<Button
								variant="contained"
								size="small"
								onClick={handleUploadImage}
							>
								Push Image
							</Button>
						)}
						{loading && (
							<Button variant="contained" size="small">
								Pushing...
							</Button>
						)}
					</Box>
					<Box
						sx={{
							mb: 1,
							fontSize: "small",
							color: "#43940d",
						}}
					>
						{newImgUrl && "Images Ready to update"}
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
