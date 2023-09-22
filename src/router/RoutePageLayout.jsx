import { Box } from "@mui/system";
import { Outlet, useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import { useEffect } from "react";
import { getUser } from "../api/user";

export const RoutePageLayout = ({ children }) => {
	//   const { pathname } = useLocation();

	//   useEffect(() => {
	//     // send route-change log event to our mongodb collection
	//   }, [pathname]);

	const navigate = useNavigate();

	async function handleGetUser() {
		try {
			const user = await getUser();
			if (!user) {
				navigate("/welcome");
				localStorage.clear();
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		let token = localStorage.getItem("token");
		if (!token || token === "" || token === "undefined") {
			navigate("/welcome");
		}
		handleGetUser();
	}, []);

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
