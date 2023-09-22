import { Checkbox, Chip, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { getPublicTemplates } from "../api/template";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getTimeDifference } from "../utils/time";

export default function Explore() {
	return (
		<Box>
			<Box
				sx={{
					display: "flex",
					mt: 2,
				}}
			>
				{/* left filter potion */}
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
				{/* right main potion */}
				<RightComponent />
			</Box>
		</Box>
	);
}

const RightComponent = () => {
	const [searchParams] = useSearchParams();

	const [data, setData] = useState([]);
	const [loading, setloading] = useState(true);

	let searchName = searchParams.get("name");

	useEffect(() => {
		const fun = async () => {
			const res = await getPublicTemplates(searchName);
			console.log(res);

			if (res.data) {
				setData(res.data);
			}
			setloading(false);
		};
		fun();
	}, [searchName]);

	if (loading) {
		return (
			<Box sx={{ pl: 1, flex: 1 }}>
				<Skeleton
					variant="rectangular"
					width={"100%"}
					height={"150px"}
					sx={{ borderRadius: "5px" }}
				/>
				<br />
				<Skeleton
					variant="rectangular"
					width={"100%"}
					height={"150px"}
					sx={{ borderRadius: "5px" }}
				/>
			</Box>
		);
	}
	return (
		<Box sx={{ pl: 1, flex: 1, ml: 2 }}>
			{data?.length > 0 &&
				data.map((value) => (
					<Box
						key={value.id}
						sx={{
							bgcolor: "#fff",
							width: "100%",
							minHeight: "150px",
							borderRadius: "5px",

							color: "#393f49",
							fontSize: "14px",
							fontWeight: 500,

							display: "flex",
							mb: 1,
						}}
					>
						{/* image box */}
						<Box
							sx={{
								height: "60px",
								width: "60px",
								m: 1,
								mt: 2,
							}}
						>
							<img
								src="https://d1q6f0aelx0por.cloudfront.net/product-logos/library-alpine-logo.png"
								height="100%"
								width="100%"
							/>
						</Box>

						{/* details box */}
						<Box>
							<Box sx={{ mt: 2, fontWeight: 600 }}>
								{value.name} : <i>{value.user}</i>
							</Box>
							<Box sx={{ mt: 1 }}>
								Updated {getTimeDifference(value.updatedAt)}
							</Box>
							<Box
								sx={{
									mt: 2,
									whiteSpace: "nowrap",
									overflow: "hidden",
									textOverflow: "ellipsis",
									maxWidth: "95%",
								}}
							>
								{value.description} A minimal Docker image based on Alpine Linux
								with a complete package index and only 5 MB in size!
							</Box>

							<Box
								sx={{
									mt: 2,
								}}
							>
								{[1, 2, 3, 4].map((t) => (
									<Chip
										label={`Tag ${t}`}
										sx={{ borderRadius: "4px", height: "24px", ml: 0.6 }}
									/>
								))}
							</Box>
						</Box>
					</Box>
				))}
		</Box>
	);
};

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
