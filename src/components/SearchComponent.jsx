import { useState } from "react";
import "../styles/search.css";
import { TbSearch } from "react-icons/tb";
import { useSearchParams } from "react-router-dom";
export function SearchComponent({
	onEnter,
	onSearch,
	onChange,
	title = "Search...",
}) {
	const [searchName, setSearchName] = useState("");

	const [searchParams, setSearchParams] = useSearchParams();

	console.log("in searchName", searchName);
	return (
		<div>
			<div className="search-container">
				<input
					type="search"
					id="search"
					placeholder={title}
					onInput={(e) => {
						setSearchName(e.target.value);
						setSearchParams({
							name: e.target.value,
						});
					}}
					value={searchName}
				/>
				<TbSearch
					onClick={onSearch}
					color="#828488"
					cursor={"pointer"}
					size={18}
				/>
			</div>
		</div>
	);
}
