import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
const Member = () => {
  const [member, setMember] = useState([]);

  const [id, setId] = useState("");
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );
  const navigate = useNavigate();
  //id get
  axios
    .get("http://13.209.48.23/api/study", {
      
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    })
    .then(function (response) {
      // 성공 핸들링

      setId(response.data.data.id);
    });

  useEffect(() => {
    axios
      .get("http://13.209.48.23/api/study/members/" + id, {
        headers: {
          "X-AUTH-TOKEN": accessToken,
        },
      })
      .then(function (response) {
        console.log("MEMBER LIST SETTING COMPLETE");
        setMember(response.data.data);
      });
  }, [id]);
  return (
    <div id="memberList">
      {member.map((member) => {
        return (
          <div
            id="member"
            key={member.id} /*onClick={()=> viewNote(reviewList.id)}*/
          >
            <img src="../../img/profile.png" className="profile" width="85px" />
            <p className="name">{member.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Member;
