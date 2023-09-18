import { Checkbox } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function Explore() {
	return (
		<Box>
			<Box
				sx={{
					display: "flex",
					mt: 2,
				}}
			>
				{/* right filter potion */}
				<Box>
					<Box
						sx={{
							fontSize: "18px",
							fontWeight: "500",
						}}
					>
						Filters
					</Box>
					<Box>
						{FilterListData?.length > 0 &&
							FilterListData.map((sub) => (
								<Box key={sub.name}>
									<Box
										sx={{
											fontSize: "18px",
											color: "rgb(226, 226, 226)",
											fontSize: "1rem",
											letterSpacing: "0.02em",
											lineHeight: "1.4375em",
											fontFamily: "Roboto, system-ui, sans-serif",
											fontWeight: "600",

											mt: 2,
										}}
									>
										{sub.name}
									</Box>
									{sub.list?.length > 0 &&
										sub.list.map((list) => (
											<Box
												sx={{
													display: "flex",
													alignItems: "center",
													color: "rgb(245, 245, 245)",
												}}
												key={list}
											>
												<Checkbox
													sx={{
														color: "rgb(226, 226, 226)",
														py: 0.5,
													}}
												/>
												{list}
											</Box>
										))}
								</Box>
							))}
					</Box>
				</Box>
				{/* left main potion */}
			</Box>
		</Box>
	);
}

const FilterListData = [
	{
		name: "Products",
		list: ["Images", "Extensions"],
	},
	{
		name: "Trusted Content",
		list: ["some one", "somether two"],
	},
];
