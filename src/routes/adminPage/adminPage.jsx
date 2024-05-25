import "./adminPage.scss";

function AdminPage() {
  return (
    <div className="adminPage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">This is Admin Panel.</h1>
          <p>Here, You can Create Games and Approve Teams.</p>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/logo.png" alt="" />
      </div>
    </div>
  );
}

export default AdminPage;
