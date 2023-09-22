import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import TopNav from "../components/TopNav";
import { useState } from "react";

export const RoutePageLayout = ({ children }) => {
	//   const { pathname } = useLocation();

	//   useEffect(() => {
	//     // send route-change log event to our mongodb collection
	//   }, [pathname]);

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				backgroundImage: `linear-gradient(to right top, #01266b, #012563, #02235c, #052254, #07204c, #02264f, #002b51, #003052, #003d5b, #004a5f, #00565f, #04625c)`,
				backgroundImage: `linear-gradient(to right top, #d0d0d1, #b1b2c3, #9294b4, #7378a6, #525d97, #4b559d, #454ca1, #4143a5, #6545bb, #8d41cd, #b736db, #e316e3)`,
			}}
		>
			<Box
				sx={{
					width: "100vw",
					maxWidth: "1260px",

					minHeight: "100vh",

					backgroundSize: "cover",
					backgroundPosition: "top",
					backgroundRepeat: "no-repeat",

					textSizeAdjust: "100%",
					WebkitFontSmoothing: "antialiased",
					px: "10vw",
				}}
			>
				<TopNav />
				<Outlet />
			</Box>
		</Box>
	);
};
