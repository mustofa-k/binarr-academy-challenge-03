import TodoItems from "../components/PageItems";
import PageSearch from "../components/PageSearch";

const HomePage = () => {
	return (
		<main className="container">
			<PageSearch />
			<TodoItems />
		</main>
	);
};

export default HomePage;