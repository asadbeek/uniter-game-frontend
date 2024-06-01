import { useContext, useState } from "react";
import "./newTeamPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "primereact/multiselect";
import { gamesData } from "../../constants";
import { AuthContext } from "../../context/AuthContext";

function NewTeamPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [selectedGames, setSelectedGames] = useState(null);

  const { updateUser, currentUser } = useContext(AuthContext);
  console.log("currentUser", currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post(`/team/${currentUser.id}`, {
        category: selectedGames.join(","),
        name: inputs.name,
        city: inputs.city,
        numberOfPlayers: parseInt(inputs.numberOfPlayers),
        description: value,
        availableDaysAndTimes: inputs.availableDaysAndTimes,
        img: images,
      });

      const updatedUser = await apiRequest.get(`/users/${currentUser.id}`);
      updateUser(updatedUser.data);
      console.log("inputs", res);
      navigate("/team/" + res.data.team.id);
    } catch (err) {
      console.log(err);
      setError(error);
    }
  };

  return (
    <div className="newTeamPage">
      <div className="formContainer">
        <h1>Add New Team</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="name">Team Name</label>
              <input id="name" name="name" type="text" />
            </div>
            <div className="item">
              <label htmlFor="numberOfPlayers">Number of Players</label>
              <input
                id="numberOfPlayers"
                name="numberOfPlayers"
                type="number"
              />
            </div>
            <div className="item form-multi-select">
              <label htmlFor="category">Category</label>
              <MultiSelect
                value={selectedGames}
                id="category"
                name="category"
                onChange={(e) => setSelectedGames(e.value)}
                options={gamesData}
                optionLabel="label"
                display="chip"
                placeholder="Select Games"
                maxSelectedLabels={3}
                className=""
              />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="availableDaysAndTimes">Available Days</label>
              <input
                id="availableDaysAndTimes"
                name="availableDaysAndTimes"
                type="text"
              />
            </div>
            <button className="sendButton">Add</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        <img src={images} alt="" />
        <UploadWidget
          uwConfig={{
            cloudName: "dauaqt6sn",
            uploadPreset: "Uniter",
            multiple: false,
            folder: "teams",
          }}
          setAvatar={setImages}
        />
      </div>
    </div>
  );
}

export default NewTeamPage;
