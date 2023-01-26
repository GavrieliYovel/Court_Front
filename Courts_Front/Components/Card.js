import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
import styled from 'styled-components/native';
import {Feather, MaterialCommunityIcons} from "@expo/vector-icons";


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
`;

const StyledTitle = styled.Text`
  width: 100%;
  font-weight: bold;
`;
const ButtonContainer = styled(View)`
  display: flex;
  flex-direction: row;
`;


const StylishCard = ({title, children, details}) => {
    return (

        <StyledCard>
            <StyledText>{title}</StyledText>
            <StyledView style={{flex: 1, flexDirection: "row"}}>
                <StyledTitle>Details:</StyledTitle>
                <Text>{details}</Text>
                <StyledTitle> Team Members:</StyledTitle>
                {children}
            </StyledView>
            <ButtonContainer style={{flex: 1,justifyContent:'flex-end', direction:'rtl'}}>
                <TouchableOpacity style={{
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                    height: 30,
                    width: 75,
                    backgroundColor: "palegreen",
                    borderRadius: 20
                }}>
                    <Text> Edit </Text>
                    <Feather name="edit" size={24} color="black"/>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent:"space-evenly",
                    height: 30,
                    width: 75 ,
                    backgroundColor: "orangered",
                    borderRadius: 20,
                    margin: "5px 3px 5px 3px",

                }}>
                    <Text> Leave </Text>
                    <MaterialCommunityIcons name="exit-run" size={24} color="black" />
                </TouchableOpacity>
            </ButtonContainer>

        </StyledCard>
    )
};

export default StylishCard;




