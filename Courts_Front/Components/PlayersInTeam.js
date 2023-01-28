import idToColor from "./idToColor";
import {Text, View} from "react-native";
import React from "react";
import styled from "styled-components/native";

const StyledViewForPlayers = styled(View)`
  //background-color: black;
  color: white;
  border-radius: 7px;
  margin: 5px 3px 5px 3px;
`;

let PlayersInTeam = ({team}) => {
    return (
        team.players.map((player) => {
            const color = idToColor(player._id);
            return (<StyledViewForPlayers><Text
                style={{color: color, fontWeight: "bold" }}>{player.name}</Text></StyledViewForPlayers>)
        })

    )
}
PlayersInTeam = styled(PlayersInTeam)`
    ;
      color: white;
      font-weight: bold;
      border-radius: 10;
      margin: 10px;
      padding: 20px;
    `;

export default PlayersInTeam;
