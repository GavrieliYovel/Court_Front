import {Text, View} from "react-native";
import styled from "styled-components/native";
import {Card} from "react-native-elements";
import React from "react";


const AgendaItem = (item, firstItemInDay) => {

    return (
        <StyledCard>
            <StyledText>{item.name}</StyledText>
            <StyledView>
                <LabelTextContainer>
                    <StyledTitle>Team:</StyledTitle>
                    <Text>{item.team.name}</Text>
                </LabelTextContainer>
                <LabelTextContainer>
                    <StyledTitle>Game:</StyledTitle>
                    <Text>{item.type}</Text>
                </LabelTextContainer>
                <LabelTextContainer>
                    <StyledTitle>Start Time:</StyledTitle>
                    <Text>{item.startTime}</Text>
                </LabelTextContainer>
                <LabelTextContainer>
                    <StyledTitle>End Time:</StyledTitle>
                    <Text>{item.endTime}</Text>
                </LabelTextContainer>
                <LabelTextContainer>
                    <StyledTitle>Court:</StyledTitle>
                    <Text>{item.court}</Text>
                </LabelTextContainer>
            </StyledView>
        </StyledCard>
    )
}

const LabelTextContainer = styled(View)`
  flex: 1;
  width: 100;
  flex-direction: row;
  align-items: flex-start;
`;
const StyledCard = styled(Card.Divider)`
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
