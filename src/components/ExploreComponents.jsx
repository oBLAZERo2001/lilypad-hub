import { Box, Checkbox } from "@mui/material";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

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
	const [sortType, setSortType] = useState("date");
	const [sortOrder, setOrder] = useState("new");
	const [searchParams, setSearchParams] = useSearchParams();
	const name = searchParams.get("name");

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
						checked={sortOrder === "new" && sortType === "date"}
						onChange={(e) => {
							if (e.target.checked) {
								setSortType("date");
								setOrder("new");
								// searchParams.set("sortOrder", "new");
								// searchParams.set("sortType", "date");
								setSearchParams({
									sortOrder: "new",
									sortType: "date",
									name: name ? name : "",
								});
							}
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
						checked={sortOrder === "old" && sortType === "date"}
						onChange={(e) => {
							if (e.target.checked) {
								setSortType("date");
								setOrder("old");
								// searchParams.set("sortOrder", "old");
								// searchParams.set("sortType", "date");
								setSearchParams({
									sortOrder: "old",
									sortType: "date",
									name: name ? name : "",
								});
							}
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
						checked={sortType === "clones"}
						onChange={(e) => {
							if (e.target.checked) {
								setSortType("clones");
								setOrder("old");

								// searchParams.set("sortType", "clones");
								setSearchParams({
									sortOrder: "new",
									sortType: "clones",
									name: name ? name : "",
								});
							}
						}}
					/>
					Highest Clones
				</Box>
			</Box>
		</Box>
	);
}
