import React from 'react';
import {View, Text} from 'react-native';
import {Card} from 'react-native-elements';
import styled from 'styled-components/native';
import {Feather, FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons";
import ThemedButton from "react-native-really-awesome-button/src/themed/ThemedButton";


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
  flex-direction: row;

`;


const CardTeamListPlayer = ({onExit, navigation, children, team}) => {
    return (

        <StyledCard>
            <StyledText>{team.name}</StyledText>
            <StyledView style={{flex: 1, flexDirection: "row"}}>
                <StyledTitle>Details:</StyledTitle>
                <Text>{team.details}</Text>
                <StyledTitle> Team Members:</StyledTitle>
                {children}
            </StyledView>
            <ButtonContainer style={{flex: 1, justifyContent: 'flex-end', direction: 'rtl'}}>
                <ThemedButton onPress={() => navigation.navigate("TeamForm", {title: team.name, team: team})}
                              style={{marginLeft: 5}} raiseLevel={2} borderRadius={30} activityColor={"darkgreen"}
                              borderColor={"darkgreen"} backgroundColor={"darkseagreen"} width={60} stretch={false}
                              name={"bruce"} type="primary" size={"small"}>
                    <Feather name="edit" size={24} color="black"/>
                </ThemedButton>
                <ThemedButton onPress={() => onExit(team)} style={{marginLeft: 5}} raiseLevel={2} borderRadius={30}
                              activityColor={"darkgreen"} borderColor={"darkgreen"} backgroundColor={"tomato"}
                              width={60} stretch={false} name={"bruce"} type="primary" size={"small"}>
                    <MaterialCommunityIcons name="exit-run" size={24} color="black"/>
                </ThemedButton>
            </ButtonContainer>
        </StyledCard>
    )
};

const CardTeamsToJoin = ({onJoin, team, children}) => {
    return (
        <StyledCard>
            <StyledText>{team.name}</StyledText>
            <StyledView style={{flex: 1, flexDirection: "row"}}>
                <StyledTitle>Details:</StyledTitle>
                <Text>{team.details}</Text>
                <StyledTitle> Team Members:</StyledTitle>
                {children}
            </StyledView>
            <ThemedButton onPress={() => onJoin(team)} raiseLevel={2} borderRadius={30} activityColor={"darkgreen"}
                          borderColor={"darkgreen"} backgroundColor={"green"} width={60} stretch={true} name={"bruce"}
                          type="primary" size={"small"}>
                <FontAwesome name="plus" size={24} color="white"/>
            </ThemedButton>
        </StyledCard>
    )
}

module.exports = {CardTeamListPlayer, CardTeamsToJoin};




