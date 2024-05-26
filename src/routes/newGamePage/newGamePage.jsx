import { useEffect, useState } from "react";
import "./newGamePage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";
import { gamesData } from "../../constants";

function NewGamePage() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [images, setImages] = useState("");
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    setAdmin(userLocal);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await apiRequest.post(`/games/${admin.id}`, {
        name: name,
        category: category,
        description: value,
        isPublished: isPublished,
        image: images,
      });
      console.log("GameInputs", res);

      if (res.data.game) {
        navigate("/admin/game/list/");
      }
    } catch (err) {
      console.log(err);
      setError(error);
    }
  };

  return (
    <div className="newGamePage">
      <div className="formContainer">
        <h1>Add New Game</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="name">Game Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                id="name"
                name="name"
                type="text"
                value={name}
              />
            </div>
            <div className="item">
              <label htmlFor="category">Game Categories:</label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                id="category"
                name="category"
                type="text"
                value={category}
              >
                {gamesData.map((game, index) => (
                  <option key={index} value={game.value}>
                    {game.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="item description">
              <label htmlFor="desc">Game Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div>
              <label htmlFor="isPublished">IsPublished</label>
              <input
                onChange={(e) => setIsPublished(e.target.value)}
                id="isPublished"
                name="isPublished"
                type="checkbox"
                value={isPublished}
                style={{ marginLeft: "5px" }}
              />
            </div>
            <div className="button-group">
              <div className="item">
                <img src={images} alt="" />
                <UploadWidget
                  uwConfig={{
                    cloudName: "dauaqt6sn",
                    uploadPreset: "Uniter",
                    multiple: false,
                    folder: "games",
                  }}
                  setAvatar={setImages}
                />
              </div>
              <button className="sendButton">Add</button>
            </div>
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {/* <img src="/logo.png" alt="" /> */}
      </div>
    </div>
  );
}

export default NewGamePage;
