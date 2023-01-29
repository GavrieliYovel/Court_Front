import {Text, View} from "react-native";
import styled from "styled-components/native";
import {Card} from "react-native-elements";
import ThemedButton from "react-native-really-awesome-button/src/themed/ThemedButton";
import {FontAwesome} from "@expo/vector-icons";
import React from "react";


const AgendaItem = (item, firstItemInDay) => {

    return (
        <StyledCard>
            <StyledText>{item.name}</StyledText>
            <StyledView style={{flex: 1, flexDirection: "row"}}>
                <StyledTitle>Team:</StyledTitle>
                <Text>{item.team.name}</Text>
                <StyledTitle>Game:</StyledTitle>
                <Text>{item.type}</Text>
                <StyledTitle>Start Time</StyledTitle>
                <Text>{item.startTime}</Text>
                <StyledTitle>End Time</StyledTitle>
                <Text>{item.endTime}</Text>


            </StyledView>
        </StyledCard>
    )
}

const StyledCard = styled(Card.Divider)`
  flex: 1;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  background-color: #F8F9FA;
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
  display: flex;
`;

const StyledText = styled.Text`
  font-size: 18;
  font-weight: bold;
  text-align: center;
  color: #333;
`;

const StyledView = styled.View`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

const StyledTitle = styled.Text`
  width: 100%;
  font-weight: bold;
`;
const ButtonContainer = styled(View)`
  //display: flex;
  flex-direction: row;`;

export default AgendaItem;
