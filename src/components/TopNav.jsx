import { Box } from "@mui/material";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router";
import { SearchComponent } from "./SearchComponent";

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
				</Box>
				{/* right position */}
				<SearchComponent />
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
