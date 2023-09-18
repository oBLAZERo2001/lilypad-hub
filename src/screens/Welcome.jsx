import { Box, FormControl, TextField } from "@mui/material";
import React from "react";

export default function Welcome() {
	return (
		<Box>
			<Box
				sx={{
					backgroundImage: `linear-gradient(to right top, #01266b, #012563, #02235c, #052254, #07204c, #02264f, #002b51, #003052, #003d5b, #004a5f, #00565f, #04625c)`,
					backgroundImage: `linear-gradient(to right top, #d0d0d1, #b1b2c3, #9294b4, #7378a6, #525d97, #4b559d, #454ca1, #4143a5, #6545bb, #8d41cd, #b736db, #e316e3)`,
					width: "100vw",
					height: "100vh",

					backgroundSize: "cover",
					backgroundPosition: "top",
					backgroundRepeat: "no-repeat",
				}}
			>
				<Box
					sx={{
						pt: "10vh",
						px: "10vw",
						display: "flex",
						// alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Box>
						<Box
							sx={{
								textSizeAdjust: "100%",
								letterSpacing: "0.02em",
								fontFamily: "Roboto, system-ui, sans-serif",
								boxSizing: "inherit",
								paddingTop: "160px",
								maxWidth: "486px",
								color: "#ffffff",
								fontSize: "44px",
								fontWeight: "bold",
								lineHeight: "46px",
							}}
						>
							Build and Ship any Application Anywhere
						</Box>
						<Box
							sx={{
								textSizeAdjust: "100%",
								letterSpacing: "0.02em",
								fontFamily: "Roboto, system-ui, sans-serif",
								boxSizing: "inherit",
								fontSize: "14px",
								lineHeight: "20px",
								color: "#ffffff",
								fontWeight: "bold",
								maxWidth: "400px",
								marginTop: "28px",
							}}
						>
							Lilypad Hub is the world's easiest way to create, manage, and
							deliver your team's container applications.
						</Box>
					</Box>

					{/* form box */}
					<Box sx={FormBox}>
						<FormControl fullWidth>
							<TextField placeholder="User Name" size="small" />
						</FormControl>
						<Box sx={{ ...ButtonStyle, backgroundColor: "#4caf50", my: 2 }}>
							Connect Wallet
						</Box>
						<Box sx={ButtonStyle}> Sign In</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

// stylers`

const FormBox = {
	textsizeadjust: '"100%"',
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
	WebkitFontSmoothing: "antialiased",
	textSizeAdjust: "100%",
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
