import {
	Box,
	Checkbox,
	CircularProgress,
	FormControl,
	TextField,
} from "@mui/material";
import React, { useState } from "react";
import UseWallet from "../hooks/useWallet";
import { useNavigate } from "react-router-dom";
import { PrimaryColor } from "../constants";
import BgImage from "../assets/bgimage.png";
import Logo from "../assets/logo.png";

export default function Welcome() {
	const navigate = useNavigate();
	const { connectSite, signUser, connectedToWallet } = UseWallet();
	const [displayName, setDisplayName] = useState();
	const [signLoading, setSignLoading] = useState(false);
	const [nameRequired, setNameRequired] = useState(false);

	return (
		<Box
			sx={{
				height: "100vh",
				bgcolor: "#ffc000",
				display: "flex",
				justifyContent: "center",
				position: "relative",
			}}
		>
			<Box
				sx={{
					backgroundImage: `url(${BgImage})`,
					height: "100vh",
					width: "100vw",
					position: "absolute",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					zIndex: 1,
				}}
			/>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					width: "100%",
					maxWidth: "1080px",
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
						mt: 4,
					}}
				>
					<img src={Logo} alt="logo-img" height={"40px"} />
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						height: "100%",
						zIndex: 2,
						mb: 4,
					}}
				>
					{/*  left landing text */}
					<Box sx={LandingBox}>
						<Box
							sx={{
								maxWidth: "486px",
								fontSize: "44px",
								lineHeight: "46px",
							}}
						>
							Build, Test and Ship modules at ease!
						</Box>
						<Box
							sx={{
								fontSize: "14px",
								lineHeight: "20px",
								maxWidth: "400px",
								marginTop: "28px",
							}}
						>
							Lilypad Hub is the world's easiest way to create, manage, and
							publish your modules to the world for the open data economy.
						</Box>
					</Box>

					{/* form box */}
					<Box sx={FormBox}>
						<Box
							sx={{
								fontSize: "2rem",
								fontWeight: 600,
								letterSpacing: "0px",
								textAlign: "left",
							}}
						>
							Create your account✨
						</Box>
						<Box
							sx={{
								margin: "0px",
								fontWeight: 500,
								letterSpacing: "0px",
								mb: 2,
							}}
						>
							Connect wallet and sign in🪧
						</Box>
						<FormControl fullWidth sx={{ mb: 1 }}>
							<TextField
								placeholder="User Name"
								size="small"
								value={displayName}
								onChange={(e) => {
									setNameRequired(false);
									setDisplayName(e.target.value);
								}}
								error={nameRequired}
							/>
						</FormControl>
						<Box
							sx={{
								textAlign: "start",
							}}
						>
							<Box sx={{ alignContent: "center" }}>
								<Checkbox
									checked={connectedToWallet}
									// disabled
									onClick={() => {}}
									sx={{ p: 0.5, cursor: "default" }}
									color={connectedToWallet ? "warning" : "primary"}
								/>

								{!connectedToWallet
									? "Please connect wallet"
									: "Connected to wallet"}
							</Box>
							{!connectedToWallet && (
								<Box
									sx={{ ...ButtonStyle, backgroundColor: PrimaryColor, my: 1 }}
									onClick={connectSite}
								>
									Connect Wallet
								</Box>
							)}
						</Box>
						{connectedToWallet && (
							<Box
								sx={{ ...ButtonStyle, backgroundColor: PrimaryColor, my: 1 }}
								onClick={async () => {
									if (displayName) {
										setSignLoading(true);
										await signUser(displayName);
										setSignLoading(false);
										navigate("/explore");
									} else {
										setNameRequired(true);
									}
								}}
							>
								{signLoading ? <CircularProgress /> : "Sign In"}
							</Box>
						)}
					</Box>
				</Box>

				<Box />
			</Box>
		</Box>
	);
}

// stylers`

const LandingBox = {
	letterSpacing: "0.02em",
	boxSizing: "inherit",
	color: "#000",
	fontWeight: "bold",
};

const FormBox = {
	fontSize: "1rem",
	fontWeight: 400,
	borderRadius: "8px",
	letterSpacing: "0.02em",
	boxSizing: "inherit",
	backgroundColor: "rgb(255, 255, 255)",
	color: "rgb(0, 0, 0)",
	transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
	boxShadow:
		"rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
	backgroundImage: "none",
	overflow: "hidden",
	padding: "32px 40px",
	minWidth: "470px",
	textAlign: "center",
};

const ButtonStyle = {
	overflow: "visible",
	display: "inline-flex",
	WebkitBoxAlign: "center",
	alignItems: "center",
	WebkitBoxPack: "center",
	justifyContent: "center",
	position: "relative",
	boxSizing: "border-box",
	WebkitTapHighlightColor: "transparent",
	outline: "0px",
	border: "0px",
	margin: "0px",
	cursor: "pointer",
	userSelect: "none",
	verticalAlign: "middle",
	appearance: "none",
	textDecoration: "none",
	fontWeight: 500,
	fontSize: "1rem",
	borderRadius: "4px",
	transition:
		"background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
	backgroundColor: "rgb(8, 109, 215)",
	width: "100%",
	boxShadow: "none",
	whiteSpace: "nowrap",
	textTransform: "none",
	minWidth: "40px",
	padding: "8px 16px",
};
