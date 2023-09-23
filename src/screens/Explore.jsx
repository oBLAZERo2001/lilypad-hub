import { Checkbox, Chip, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { getPublicTemplates } from "../api/template";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
							bgcolor: "rgb(43, 49, 57)",
							width: "100%",
							minHeight: "120px",
							borderRadius: "5px",
							color: "white",
							fontSize: "14px",
							fontWeight: 500,
							display: "flex",
							mb: 1,
							cursor: "pointer",
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
								src={value.img ? value.img : "/images/defaultModule.png"}
								height="100%"
								width="100%"
								alt="library-img"
								style={{
									backgroundColor: !value.img ? "white" : "",
									borderRadius: !value.img ? "5pc" : "",
								}}
							/>
						</Box>
						{/* details box */}
						<Box>
							<Box sx={{ mt: 2, fontWeight: 600 }}>{value.name}</Box>
							<Box sx={{ mt: 0.5, fontWeight: 500, color: "#9f9f9f" }}>
								{value.user.displayName}/{value.name}
							</Box>
							<Box
								sx={{
									mt: 0.5,
									mb: 2,
									whiteSpace: "nowrap",
									overflow: "hidden",
									textOverflow: "ellipsis",
									maxWidth: "95%",
								}}
							>
								{value.description}
							</Box>
							<Box
								sx={{
									mt: 1,
									fontWeight: 400,
									fontSize: "12px",
									color: "#9f9f9f",
								}}
							>
								Updated {getTimeDifference(value.updatedAt)}
							</Box>

							<Box
								sx={{
									mt: 2,
								}}
							>
								{/* {[1, 2, 3, 4].map((t) => (
									<Chip
										label={`Tag ${t}`}
										sx={{ borderRadius: "4px", height: "24px", ml: 0.6 }}
									/>
								))} */}
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
