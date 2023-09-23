import {
	Avatar,
	Box,
	Chip,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
	AiFillDelete,
	AiFillFolder,
	AiOutlineDelete,
	AiOutlineEdit,
} from "react-icons/ai";
import { deleteTemplate, getTemplates } from "../api/template";
import { Link } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { EditModelDialog } from "../components/EditModelDialog";

export default function Modules() {
	const [modules, setModules] = useState();
	const [open, setOpen] = useState(false);
	const [editModel, seteditModel] = useState({});

	async function gM() {
		const resp = await getTemplates();
		setModules(resp);
	}

	useEffect(() => {
		gM();
	}, []);

	return (
		<Box sx={{ p: 2, flex: 1 }} width={"100%"}>
			<Box sx={{ textAlign: "center" }}>
				<h2>My Modules </h2>
				{/* <p>Click to load modules.</p> */}
			</Box>
			<br />
			<Box>
				{modules?.length === 0 && (
					<Box>
						Your modules is emplty.{" "}
						<Link to="/playground" relative="path">
							create new modules.
						</Link>
					</Box>
				)}
			</Box>
			<Box>
				{modules &&
					modules?.map((m, i) => {
						return (
							<ListItem
								secondaryAction={
									m._id !== 0 && (
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
											}}
										>
											<Box
												sx={{
													pr: 3,
												}}
											>
												<Chip
													label={m.visibility}
													sx={{
														borderRadius: "3px",
														color: "#f1f1f1",
														fontSize: "14px",
													}}
												/>
											</Box>
											<IconButton
												edge="end"
												aria-label="edit"
												onClick={async () => {
													setOpen(true);
													seteditModel(m);
												}}
												sx={{
													mr: 2,
												}}
												color="warning"
											>
												<AiOutlineEdit />
											</IconButton>

											<IconButton
												edge="end"
												aria-label="delete"
												onClick={async () => {
													await deleteTemplate(m._id);
													gM();
												}}
												color="error"
											>
												<MdOutlineDeleteOutline />
											</IconButton>
										</Box>
									)
								}
								key={i}
							>
								<ListItemAvatar>
									<Avatar>
										<AiFillFolder />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={m.name}
									secondary={`${new Date(
										m.createdAt
									).toLocaleDateString()} ${new Date(
										m.createdAt
									).toLocaleTimeString()}`}
								/>
							</ListItem>
						);
					})}
			</Box>
			<EditModelDialog
				open={open}
				setOpen={setOpen}
				model={editModel}
				reGet={gM}
			/>
		</Box>
	);
}
