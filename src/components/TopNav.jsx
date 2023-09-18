import { Box, Divider, IconButton, InputBase, Paper } from "@mui/material";

import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router";

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
						sx={{
							width: "30px",
						}}
					>
						<img src="/images/hub.png" width="100%" height="100%" />
					</Box>
					<Name />
					<SearchInputBase />
				</Box>
				{/* right position */}

				<Box
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<Box
						sx={RightNavs}
						onClick={() => {
							navigate("/explore");
						}}
					>
						Explore
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

const Name = () => {
	return (
		<Box
			sx={{
				fontSize: "20px",
				fontWeight: "bold",
				fontFamily: `'Raleway', sans-serif`,
				ml: 1,
			}}
		>
			<span
				style={{
					color: "#ED72AC",
				}}
			>
				Lily
			</span>
			<span
				style={{
					color: "#ebebeb",
				}}
			>
				pad
			</span>
			<span
				style={{
					color: "#2FA7DE",
				}}
			>
				hub
			</span>
		</Box>
	);
};

const SearchInputBase = () => {
	return (
		<Paper
			component="form"
			sx={{
				p: "2px 4px",
				display: "flex",
				alignItems: "center",
				width: 400,
				ml: 2,
			}}
		>
			<IconButton type="button" sx={{ p: "6px" }} aria-label="search">
				<AiOutlineSearch />
			</IconButton>
			{/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				placeholder="Search Lilypad Hub"
				inputProps={{ "aria-label": "search lilypad hub" }}
				size="small"
			/>
		</Paper>
	);
};

const RightNavs = {
	color: "#fff",
	fontSize: "16px",
	fontWeight: "500",
	lineHeight: 1.4,
	mr: 1,

	"&:hover": {
		cursor: "pointer",
		color: "rgba(255,255,255,0.8)",
	},
};
