import { Box, Checkbox, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import UseWallet from "../hooks/useWallet";

export default function Welcome() {
	const { connectSite, signUser, connectedToWallet } = UseWallet();
	const [displayName, setDisplayName] = useState();

	return (
		<Box
			sx={{
				pt: "10vh",
				display: "flex",
				justifyContent: "space-between",
			}}
		>
			{/*  left landing text */}

			<Box sx={LandingBox}>
				<Box
					sx={{
						paddingTop: "120px",
						maxWidth: "486px",
						fontSize: "44px",
						lineHeight: "46px",
					}}
				>
					Build and Ship any Application Anywhere
				</Box>
				<Box
					sx={{
						fontSize: "14px",
						lineHeight: "20px",
						maxWidth: "400px",
						marginTop: "28px",
					}}
				>
					Lilypad Hub is the world's easiest way to create, manage, and deliver
					your team's container applications.
				</Box>
			</Box>

			{/* form box */}
			<Box sx={FormBox}>
				<Box
					sx={{
						color: "rgb(0, 0, 0)",
						boxSizing: "inherit",
						margin: "0px",
						fontSize: "2rem",
						fontWeight: 500,
						letterSpacing: "0px",
						lineHeight: 1.143,
						fontFamily: "Roboto, system-ui, sans-serif",
						textAlign: "left",

						mb: 2,
					}}
				>
					Lilypad Hub welcomes you
				</Box>
				<Box
					sx={{
						color: "rgb(0, 0, 0)",
						boxSizing: "inherit",
						margin: "0px",
						fontSize: "1.143rem",
						fontWeight: 500,
						letterSpacing: "0px",
						lineHeight: 1.25,
						fontFamily: "Roboto, system-ui, sans-serif",

						mb: 2,
					}}
				>
					Sign in
				</Box>
				<FormControl fullWidth sx={{ mb: 1 }}>
					<TextField
						placeholder="User Name"
						size="small"
						value={displayName}
						onChange={(e) => {
							setDisplayName(e.target.value);
						}}
					/>
				</FormControl>
				{!connectedToWallet && (
					<Box
						sx={{ ...ButtonStyle, backgroundColor: "#4caf50", my: 1 }}
						onClick={connectSite}
					>
						Connect Wallet
					</Box>
				)}
				<Box sx={{ alignContent: "center" }}>
					<Checkbox
						checked={connectedToWallet}
						// disabled
						onClick={() => {}}
						sx={{ p: 0.5, cursor: "default" }}
						color={connectedToWallet ? "success" : "primary"}
					/>

					{!connectedToWallet ? "Please connect wallet" : "Connected to wallet"}
				</Box>
				{connectedToWallet && (
					<Box
						sx={{ ...ButtonStyle, backgroundColor: "#4caf50", my: 1 }}
						onClick={() => {
							if (displayName) signUser(displayName);
						}}
					>
						Sign In
					</Box>
				)}
			</Box>
		</Box>
	);
}

// stylers`

const LandingBox = {
	letterSpacing: "0.02em",
	fontFamily: "Roboto, system-ui, sans-serif",
	boxSizing: "inherit",
	color: "#ffffff",
	fontWeight: "bold",
};

const FormBox = {
	fontSize: "1rem",
	fontWeight: 400,
	letterSpacing: "0.02em",
	lineHeight: 1.429,
	fontFamily: "Roboto, system-ui, sans-serif",
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
};

const ButtonStyle = {
	font: "inherit",
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
	fontFamily: "Roboto, system-ui, sans-serif",
	fontWeight: 500,
	fontSize: "1rem",
	lineHeight: 1.75,
	borderRadius: "4px",
	transition:
		"background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
	color: "rgb(255, 255, 255)",
	backgroundColor: "rgb(8, 109, 215)",
	width: "100%",
	boxShadow: "none",
	whiteSpace: "nowrap",
	textTransform: "none",
	minWidth: "40px",
	padding: "8px 16px",
};
