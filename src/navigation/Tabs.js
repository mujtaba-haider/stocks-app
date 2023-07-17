import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import MarketsScreen from './screens/MarketsScreen';
import PortfolioScreen from './screens/PortfolioScreen';
import NewsScreen from './screens/NewsScreen';

//Screen names
const markets = "Markets";
const portfolio = "Portfolio";
const news = "News";

const Tab = createBottomTabNavigator();

function Tabs() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={markets}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === markets) {
                            iconName = focused ? 'swap-vertical' : 'swap-vertical-outline';

                        } else if (rn === portfolio) {
                            iconName = focused ? 'pie-chart' : 'pie-chart-outline';

                        } else if (rn === news) {
                            iconName = focused ? 'newspaper' : 'newspaper-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#4E6EDD',
                    tabBarInactiveTintColor: 'black',
                    tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
                    tabBarStyle: [
                        {
                            display: "flex",
                            padding: 10, height: 70
                        },
                        null
                    ]
                })}>

                <Tab.Screen name={portfolio} component={PortfolioScreen} options={{ headerShown: false }} />
                <Tab.Screen name={markets} component={MarketsScreen} options={{ headerShown: false }} />
                <Tab.Screen name={news} component={NewsScreen} options={{ headerShown: false }} />

            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Tabs;