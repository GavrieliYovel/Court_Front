import {Calendar, CalendarList, WeekCalendar, CalendarProvider} from "react-native-calendars/src/index";
import {Agenda} from "react-native-calendars";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import getGamesByPlayerId from "../Fetches/getGamesByPlayerId";
import {ActivityIndicator, Text, View} from "react-native";
import {useIsFocused} from "@react-navigation/native";
import AgendaItem from "../Components/AgendaItem";

const renderSeparatorView = () => {
    return (
        <View style={{
            height: 1,
            width: "100%",
            backgroundColor: "#CEDCCE",
        }}
        />
    );
};

const GamesHome = () => {
    const user = useSelector(selectUser);

    const [playerGames, setPlayerGames] = useState({});
    const [loading, setLoading] = useState(true)

    const isFocused = useIsFocused();

    useEffect(() => {

        getGamesByPlayerId(user.userID).then((games) => {
                setLoading(true);
                let obj = {};
                return games.reduce((accumulator, game) => {
                    const gameDate = new Date(game.gameDate).toISOString().split('T')[0];
                    const gameStartTime = new Date(game.gameDate).toISOString().split('T')[1].slice(0, 5);
                    const gameEndTime = new Date(game.endDate).toISOString().split('T')[1].slice(0, 5);
                    const newObjToPush = {
                        name: `${game.scope} Game`,
                        startTime: gameStartTime,
                        endTime: gameEndTime,
                        team: game.team,
                        type: game.scope,
                        court: game.court.name
                    }
                    accumulator[gameDate] = [...(accumulator[gameDate] || []), newObjToPush];
                    return accumulator

                }, obj);
            }
        ).then((reducedGames) => setPlayerGames(reducedGames)).then(() => setLoading(false));

    }, [isFocused])


    return (


        <CalendarProvider date={new Date().toDateString()}>
            <ActivityIndicator animating={loading} style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 200,
                bottom: 0,
            }} size={150} color="black"/>
            {!loading && <Agenda showOnlySelectedDayItems={false} items={playerGames} renderItem={AgendaItem}
                                 renderEmptyData={() =>
                                     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                         <Text style={{fontWeight: 'bold'}}>No games this day</Text>
                                     </View>}/>}
        </CalendarProvider>


    )
}


export default GamesHome;
