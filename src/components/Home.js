import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [input, setInput] = useState();
  const [inputValue, setInputValue] = useState();
  const [data, setData] = useState([]);

  const history = useHistory();
  const logoutHandler = () => {
    history.replace("/");
  };
  const inputHandler = (event) => {
    setInput(event.target.value);
    setInputValue(event.target.value);
  };

  const sendHandler = () => {
    const obj = {
      input: input,
      name: localStorage.getItem("name"),
    };
    axios.post(
      "https://slack-nitin-default-rtdb.firebaseio.com/name.json",
      obj
    );
    setInputValue("");
  };
  axios
    .get("https://slack-nitin-default-rtdb.firebaseio.com/name.json")
    .then((response) => {
      const finalData = [];
      for (let key in response.data) {
        const obj = {
          final: response.data[key].input,
          name: response.data[key].name,
          key: key,
        };
        finalData.push(obj);
      }
      setData(finalData);
    });
  const deleteHandler = (key) => {
    axios.delete(
      `https://slack-nitin-default-rtdb.firebaseio.com/name/${key}.json`
    );
  };
  return (
    <div>
      <nav>
        <h1>
          Welcome to <span style={{ color: "red" }}>S</span>
          <span style={{ color: "green" }}>L</span>
          <span style={{ color: "blue" }}>A</span>
          <span style={{ color: "yellow" }}>C</span>
          <span style={{ color: "pink" }}>K</span> Chat Portal
        </h1>
        <button className="logout" onClick={logoutHandler}>
          Log Out
        </button>
      </nav>
      <div className="chatMain">
        <input
          type={"text"}
          placeholder="Please Enter Your Name"
          className="chat"
          onChange={inputHandler}
          value={inputValue}
        />
        <button className="sendbtn" onClick={sendHandler}>
          Send
        </button>
      </div>
      {data.map((ele) => {
        return (
          <div key={ele.key} className="container">
            <h5 className="user">{ele.name}</h5>
            <h6 className="data">{ele.final}</h6>
            <div className="del">
              <button
                className="delete"
                onClick={() => {
                  deleteHandler(ele.key);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Home;
