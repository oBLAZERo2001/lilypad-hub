import { Box, Checkbox } from "@mui/material";
import React from "react";

export function ExploreFilters() {
	return (
		<Box
			sx={{
				minWidth: "175px",
			}}
		>
			<Box
				sx={{
					fontSize: "18px",
					fontWeight: "500",
				}}
			>
				Filter
			</Box>
			<Box>
				<Box>
					<Box
						sx={{
							color: "rgb(226, 226, 226)",
							mt: 2,
						}}
					>
						Images
					</Box>

					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							mt: 1,
						}}
					>
						<Checkbox
							sx={{
								color: "rgb(226, 226, 226)",
								py: 0.5,
							}}
							checked
						/>
						Docker
					</Box>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							mt: 1,
							cursor: "not-allowed",
						}}
					>
						<Checkbox
							sx={{
								color: "rgb(226, 226, 226)",
								py: 0.5,
							}}
							disabled
						/>
						Wasm
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export function ExploreSort() {
	return (
		<Box>
			<Box>
				<Box
					sx={{
						color: "rgb(226, 226, 226)",
						mt: 2,
					}}
				>
					Sort by
				</Box>

				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						mt: 1,
					}}
				>
					<Checkbox
						sx={{
							color: "rgb(226, 226, 226)",
							py: 0.5,
						}}
					/>
					Newest First
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						mt: 1,
					}}
				>
					<Checkbox
						sx={{
							color: "rgb(226, 226, 226)",
							py: 0.5,
						}}
					/>
					Oldest First
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						mt: 1,
					}}
				>
					<Checkbox
						sx={{
							color: "rgb(226, 226, 226)",
							py: 0.5,
						}}
					/>
					Highest Clones
				</Box>
			</Box>
		</Box>
	);
}
