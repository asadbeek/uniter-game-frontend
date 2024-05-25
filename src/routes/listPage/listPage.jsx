import "./listPage.scss";
import Card from "../../components/card/Card";
import { useLoaderData } from "react-router-dom";

function ListPage() {
  const data = useLoaderData();

  console.log("teams: ", data.teams);
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          {data.teams?.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="imageContainer">
        <div className="wrapper">
          <img className="img1" src="/logo.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default ListPage;
