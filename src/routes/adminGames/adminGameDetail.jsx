import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import "./adminGames.scss";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { gamesData } from "../../constants";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import apiRequest from "../../lib/apiRequest";

const AdminGameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  console.log(game);

  useEffect(() => {
    fetch(`http://localhost:8800/api/games/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setGame(data);
        setName(data.name);
        setCategory(data.category);
        setValue(data.description);
        setImage(data.image);
        setIsPublished(data.isPublished);
      })
      .catch((error) => console.error("Error fetching game:", error));
  }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  console.log("game: ", game);

  async function onUpdate() {
    try {
      const res = await apiRequest.put(`/games/updateGames/${id}`, {
        name: name,
        category: category,
        description: value,
        isPublished: isPublished,
        image: image,
      });
      if (res.status === 200) {
        const getGame = await apiRequest.get(`/games/${id}`);
        console.log(getGame.data);
        setGame(getGame.data);
        setVisible(false);
      } else {
        console.error("Failed to update the game");
      }
    } catch (error) {
      console.error("An error occurred while updating the game:", error);
    }
  }
  async function onDelete() {
    try {
      const res = await apiRequest.delete(`/games/deleteGames/${id}`);
      if (res.status === 200) {
        console.log("Game deleted successfully");
        navigate("/admin/game/list");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="game-detail--wrapper">
      <img src={game.image || "default-image-url.jpg"} alt={game.name} />
      <div className="game-detail">
        <h1>{game.name}</h1>
        <p>
          <strong>Category:</strong> {game.category}
        </p>
        <p>Status: {game.isPublished ? "Published" : "Not Published"}</p>
        <div
          className="bottom"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(game.description),
          }}
        ></div>

        {/* Update button */}
        <div>
          <Button
            label="Update"
            icon="pi pi-external-link"
            onClick={() => setVisible(true)}
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            className="p-button-danger"
            onClick={onDelete}
          />
          <Dialog
            header="Update Game"
            visible={visible}
            style={{ width: "50vw" }}
            onHide={() => setVisible(false)}
          >
            <label htmlFor="name">Game Name</label>
            <div>
              <input
                onChange={(e) => setName(e.target.value)}
                id="name"
                name="name"
                type="text"
                value={name}
              />
            </div>
            <label htmlFor="category">Game Categories:</label>
            <div className="item">
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
                checked={isPublished}
                value={isPublished}
                style={{ marginLeft: "5px" }}
              />
            </div>
            <div className="item">
              <img src={image} alt="" />
              <UploadWidget
                uwConfig={{
                  cloudName: "dauaqt6sn",
                  uploadPreset: "Uniter",
                  multiple: false,
                  folder: "games",
                }}
                setAvatar={setImage}
              />
            </div>
            <Button
              label="Save"
              icon="pi pi-external-link"
              onClick={onUpdate}
            />
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AdminGameDetail;
