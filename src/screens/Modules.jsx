import {
	Avatar,
	Box,
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

const {
	Spec,
	JobSpecDocker,
	PublisherSpec,
	Payload,
	StorageSpec,
} = require("@daggle/bacalhau-js/models");

export default function Modules() {
	const [modules, setModules] = useState();
	const [template, editTemplate] = useState([]);

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
										<Box>
											<IconButton
												edge="end"
												aria-label="edit"
												onClick={async () => {
													editTemplate(m);
												}}
												sx={{
													mr: 2,
												}}
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
												<AiOutlineDelete />
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
		</Box>
	);
}
