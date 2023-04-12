import Categories from '../../components/Categories/Categories';
import Foods from '../../components/Foods/Foods';
import Search from '../../components/Search/Search';
import './Home.css';

function Home() {
  return (
    <div className="home">
      {/* <h1>Good Evening</h1> */}
      <Search />
      <Categories />
      <Foods />
    </div>
  );
}

export default Home;
