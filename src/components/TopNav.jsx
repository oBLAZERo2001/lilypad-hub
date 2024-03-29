import { Box, IconButton } from "@mui/material";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router";
import { SearchComponent } from "./SearchComponent";

import { MdOutlineLogout } from "react-icons/md";

export default function TopNav() {
	const navigate = useNavigate();
	return (
		<Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					py: "20px",
					borderBottom: "0.0625rem solid #2C2E33",
				}}
			>
				{/* left position */}
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<Box
						onClick={() => {
							navigate("/");
						}}
						sx={{
							cursor: "pointer",
							display: "flex",
							alignItems: "center",
							mr: 2,
						}}
					>
						<img src={Logo} alt="logo-img" height={"40px"} />
					</Box>
					<SearchComponent />
				</Box>
				{/* right position */}
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
						}}
					>
						{Options.map(({ name, link }) => (
							<Box
								sx={RightNavs}
								onClick={() => {
									navigate(link);
								}}
								key={name}
							>
								{name}
							</Box>
						))}
					</Box>
					<IconButton
						title="Log out"
						onClick={() => {
							localStorage.clear();
							navigate("/welcome");
						}}
					>
						<MdOutlineLogout style={{ color: "white" }} />
					</IconButton>
				</Box>
			</Box>
		</Box>
	);
}

const Options = [
	{
		name: "Playground",
		link: "/playground",
	},
	{
		name: "Explore",
		link: "/",
	},
	{
		name: "Modules",
		link: "/module",
	},
	{
		name: "History",
		link: "/history",
	},
];

const RightNavs = {
	color: "#eaecef",
	fontSize: "14px",
	fontWeight: "500",
	mr: 3,

	"&:hover": {
		cursor: "pointer",
		color: "rgba(255,255,255,0.8)",
	},
};
