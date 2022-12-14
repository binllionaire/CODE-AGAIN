import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// ReviewPage Header
export default function Header2() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );
  const [TF, setTF] = useState(false);

  useEffect(() => {
    axios
      .post(
        "http://13.209.48.23/api/study/check",
        {},
        {
          headers: {
            "X-AUTH-TOKEN": accessToken,
          },
        }
      )
      .then((res) => {
        console.log("STUDY PARTICIPATION STATUS SETTING COMPLETE");
        if (res.data.data == true) setTF(true);
        else setTF(false);
      });
  }, []);
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get("http://13.209.48.23/api/members/token", {
        headers: {
          "X-AUTH-TOKEN": accessToken,
        },
      })
      .then(function (response) {
        console.log("HEADER USERNAME SETTING COMPLETE");
        setName(response.data.data.name);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://13.209.48.23/api/study", {
        headers: {
          "X-AUTH-TOKEN": accessToken,
        },
      })
      .then(function (response) {
        console.log("STUDY SERIAL NUMBER SETTING COMPLETE");
        setId(response.data.data.sno);
      });
  }, []);
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const mainPage = (e) => {
    console.log("LOGOUT COMPLETE");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };
  const ReviewPage = (e) => {
    console.log("NAVIGATE TO REVIEW PAGE");
    navigate("/review");
  };
  const PlannerPage = (e) => {
    console.log("NAVIGATE TO STUDY PAGE");
    if (TF == true) navigate("/study/" + id);
    else navigate("/study");
  };
  const TodoPage = (e) => {
    console.log("NAVIGATE TO TODO PAGE");
    navigate("/todo");
  };
  return (
    <header>
      <img
        id="logo"
        onClick={ReviewPage}
        src="../../img/logo.png"
        width="150px"
      />
      <p id="logout" onClick={mainPage}>
        ????????????
      </p>
      <p className="bar">|</p>
      <p id="setting">??????</p>
      <p className="bar">|</p>
      <p id="my">{name}</p>
      <p className="bar">|</p>
      <p id="theme">Dark</p>
      <div id="circle"></div>
      <div id="tab">
        <p id="reviewnote" onClick={ReviewPage}>
          ????????????
        </p>
        <p id="todo" onClick={TodoPage}>
          TODO
        </p>
        <p id="planner" onClick={PlannerPage}>
          ?????????
        </p>
      </div>
      <hr id="hr1" />
    </header>
  );
}
