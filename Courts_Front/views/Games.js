import {Calendar, CalendarList, WeekCalendar, CalendarProvider} from "react-native-calendars/src/index";
import {Agenda} from "react-native-calendars";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import getGamesByPlayerId from "../Fetches/getGamesByPlayerId";
import {Text} from "react-native";
import {useIsFocused} from "@react-navigation/native";
import AgendaItem from "../Components/AgendaItem";


const GamesHome = () => {
    const user = useSelector(selectUser);

    const [playerGames, setPlayerGames] = useState({});


    const isFocused = useIsFocused();

    useEffect( () => {
        getGamesByPlayerId(user.userID).then((games) =>{
             games.forEach((game)=>{
                    console.log(game.gameDate)
                })
        let obj = {};
        return  games.reduce((accumulator, game) => {
            const gameDate = new Date(game.gameDate).toISOString().split('T')[0];
            const gameStartTime = new Date(game.gameDate).toISOString().split('T')[1];
            const gameEndTime = new Date(game.endDate).toISOString().split('T')[1];
            const newObjToPush = {
                name: 'test',
                startTime: gameStartTime,
                endTime: gameEndTime,
                team: game.team,
                type: game.scope
            }
            accumulator[gameDate] = [...(accumulator[gameDate] || []), newObjToPush];
            return accumulator

        }, obj);}
        ).then( (reducedGames) => setPlayerGames(reducedGames));

    }, [isFocused])


    return (
        <CalendarProvider date={new Date().toDateString()}>
            <Agenda showOnlySelectedDayItems={false} items={playerGames} renderItem={AgendaItem} />
        </CalendarProvider>

    )
}


export default GamesHome;
