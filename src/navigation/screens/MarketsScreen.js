import * as React from 'react';
import { View, Text, TextInput, ScrollView, FlatList, SafeAreaView, TouchableHighlight } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const categories = [
    'Main Market',
    'Junior Market',
    'FX Rates',
    'Fund Management Market'
];

const stockList = [
    { id: 1, symbol: 'DJIA', name: 'Dow Jones Industrial', graph: '', price: '25,585.69', gain: '-0.38' },
    { id: 2, symbol: 'NASDAQ', name: 'NASDAQ Composite', graph: '', price: '6648.00', gain: '+4.22' },
    { id: 3, symbol: 'S&P 500', name: 'S&P 500 Index', graph: '', price: '2862.06', gain: '+13.49' },
    { id: 4, symbol: 'RUSS 2k', name: 'Russel 2000 Index', graph: '', price: '1514.22', gain: '-1.01' },
    { id: 5, symbol: 'NASDAQDJIA', name: 'NASDAQ Composite', graph: '', price: '6648.00', gain: '+2.64' }
];

export default function MarketsScreen({ navigation }) {
    const [searchText, setSearchText] = React.useState('');
    const [stocks, setStocks] = React.useState(stockList);
    const [activeMarket, setInactiveMarket] = React.useState(1);

    const handleSearch = (text) => {
        setSearchText(text);
    };

    const filteredData = stocks.filter((item) =>
        item.symbol.toLowerCase().includes(searchText.toLowerCase()) ||
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ backgroundColor: '#2C53F5', height: 270, width: '100%', paddingTop: 40, paddingHorizontal: 30 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <Ionicons name="menu-outline" size={30} color="#fff" />
                    <Ionicons name="notifications-outline" size={24} color="#fff" />
                </View>
                <View>
                    <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#fff', paddingTop: 20, paddingBottom: 15 }}>
                        Markets
                    </Text>
                    <TextInput
                        style={{ backgroundColor: '#5C7CF7', height: 45, borderRadius: 5, paddingHorizontal: 10 }}
                        placeholder="Search markets"
                        onChangeText={handleSearch}
                        value={searchText}
                    />

                    <ScrollView horizontal={true}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 70 }}>
                            {categories.map((name, index) =>
                                <Text style={{ height: 25, fontSize: 16, color: activeMarket === index ? '#fff' : '#5C7CF7', paddingRight: 10 }} key={index} onPress={() => { setInactiveMarket(index) }}>{name}</Text>
                            )}
                        </View>
                    </ScrollView>
                </View>
            </View>

            <SafeAreaView>
                <FlatList
                    data={filteredData}
                    renderItem={({ item }) =>
                        <TouchableHighlight
                            activeOpacity={0.6}
                            underlayColor="#DDDDDD"
                            onPress={() => navigation.navigate('Portfolio', { ...item })}>
                            <View style={{ width: '100%', paddingVertical: 20, paddingHorizontal: 30, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', borderBottomWidth: 0.5, borderBottomColor: 'lightgrey' }}>
                                <View>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.symbol}</Text>
                                    <Text style={{ color: 'grey', fontSize: 11 }}>{item.name}</Text>
                                </View>
                                <View>
                                    <Text>{item.graph}</Text>

                                </View>
                                <View>
                                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>${item.price}</Text>
                                    <Text style={{ textAlign: 'right', color: item.gain > 0 ? 'green' : 'red' }}>{item.gain}%</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    }
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        </View>
    );
}