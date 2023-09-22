import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import TopNav from "../components/TopNav";

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
				backgroundImage: `rgb(26, 27, 30)`,
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
