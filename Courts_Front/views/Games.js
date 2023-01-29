import {Calendar, CalendarList, WeekCalendar, CalendarProvider} from "react-native-calendars/src/index";
import {Agenda} from "react-native-calendars";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import getGamesByPlayerId from "../Fetches/getGamesByPlayerId";
import {Text} from "react-native";
import {useIsFocused} from "@react-navigation/native";


const GamesHome = () => {
    const user = useSelector(selectUser);
    const [render, setRender] = useState(false);
    const [playerGames, setPlayerGames] = useState({});


    const isFocused = useIsFocused();

    useEffect(async () => {
        setRender(!render);
        const games = await getGamesByPlayerId(user.userID);
        const obj = {};
        const reducedGames = games.reduce((accumulator, game) => {
            const gameDate = new Date(game.gameDate).toISOString().split('T')[0];
            accumulator[gameDate] = {name: 'test'};
        }, obj);
        console.log("reduced",reducedGames);

    }, [isFocused])


    useEffect(()=>{
        console.log(playerGames)
    }, [playerGames] )
    return (
        <CalendarProvider date={new Date().toDateString()}>
            <Text>

            </Text>
            <Agenda showOnlySelectedDayItems={true} items={playerGames}/>
        </CalendarProvider>

    )
}


export default GamesHome;
