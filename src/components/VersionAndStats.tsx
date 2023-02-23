import axios from "axios";
import { useEffect, useState } from "react";
import "./versionAndStats.css";
const pokeballRed =
  "https://sg.portal-pokemon.com/play/resources/pokedex/img/icon_ball_on.png";
const pokeballBlue =
  "https://sg.portal-pokemon.com/play/resources/pokedex/img/icon_ball.png";

const VersionAndStats = ({ id, stats }) => {
  const [description, setDesciption] = useState([]);
  const [toggle, setToggle] = useState(true);

  const statArray = stats?.map((stat) => Math.round(stat.base_stat / 15));

  console.log(statArray);

  const HP = 4;

  const HPArray = Array.from(Array(HP).keys());

  const getDesciption = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      .then((res) => setDesciption(res.data));
  };

  useEffect(() => {
    getDesciption();
  }, [id]);

  return (
    <div className="pokemon-detail__stats">
      <div className="left">
        <div>
          <h2>Versions </h2>
          <img
            onClick={() => setToggle((prev) => !prev)}
            src={toggle ? pokeballRed : pokeballBlue}
            alt=""
          />
          <img
            onClick={() => setToggle((prev) => !prev)}
            src={toggle ? pokeballBlue : pokeballRed}
            alt=""
          />
        </div>
        {toggle ? (
          <div>
            {description?.flavor_text_entries?.slice(1, 2).map((item) => (
              <p>{item.flavor_text.replace("", " ")}</p>
            ))}
          </div>
        ) : (
          <div>
            {description?.flavor_text_entries?.slice(2, 3).map((item) => (
              <p>{item.flavor_text.replace("", " ")}</p>
            ))}
          </div>
        )}
      </div>
      {/*  <div className="right">
        {HPArray.sort((a, b) => b - a).map((item, index) => {
          return (
            <div
              className={`${item <= 3 - 1 ? "essa" : "essa1"} ${
                item <= 6 - 1 ? null : "essa2"
              } `}
            >
              <p></p>
            </div>
          );
        })}
        <p>HP</p>
      </div> */}
      <div className="right">
        {statArray.map((item) => (
          <p>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default VersionAndStats;
