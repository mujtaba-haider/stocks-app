import * as React from 'react';
import { View, Text, TouchableHighlight, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const duration = [
    { id: 1, value: '1D' },
    { id: 2, value: '7D' },
    { id: 3, value: '1M' },
    { id: 4, value: '3M' },
    { id: 5, value: '1Y' }
];

const statics = [
    { id: 1, name: 'Close Price', price: '25,332.00' },
    { id: 2, name: 'Last Trade Price', price: '25,373.00' },
    { id: 3, name: 'Outstanding', price: '856,924,860.00' },
    { id: 4, name: 'Market Value', price: '$489,856,924,860.00' }
];

export default function PortfolioScreen({ navigation, route }) {
    const [stocksymbol, setStockSymbol] = React.useState('DJIA');
    const [stockname, setStockName] = React.useState('Dow Jones Industrial');
    const [stockprice, setStockPrice] = React.useState('25,585.69');
    const [stockgain, setStockGain] = React.useState('-0.38');
    const [isactive, setIsactive] = React.useState(3);

    React.useEffect(() => {
        if (route?.params?.id) {
            setStockSymbol(route.params.symbol);
            setStockName(route.params.name);
            setStockPrice(route.params.price);
            setStockGain(route.params.gain);
        }
    }, [route?.params?.id])

    return (
        <View style={{ flex: 1, width: '100%', paddingTop: 40, paddingHorizontal: 30 }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableHighlight
                    style={{ borderRadius: 50 }}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={() => navigation.navigate('Markets')}>
                    <Ionicons name='chevron-back-circle-outline' size={60} color='#000' />
                </TouchableHighlight>
                <View style={{ marginLeft: 20 }}>
                    <Text
                        style={{ fontSize: 26, fontWeight: 'bold' }}>
                        {stocksymbol}
                    </Text>
                    <Text
                        style={{ fontSize: 15, fontWeight: 'bold', color: '#C8CCCC' }}>
                        {stockname}
                    </Text>
                </View>
            </View>

            <View style={{ marginTop: 20 }}>
                <Text
                    style={{ fontSize: 36, fontWeight: '900' }}>
                    ${stockprice}
                </Text>
                <Text
                    style={{ fontSize: 15, color: stockgain > 0 ? 'green' : 'red' }}>
                    {`${stockgain > 0 ? '+' : '-'} $0.${stockprice.split('.')[1] ? stockprice.split('.')[1] : ''}  (${stockgain}%)`}
                </Text>
            </View>

            <View style={{ marginTop: 200, marginBottom: 35 }}>
                <FlatList
                    contentContainerStyle={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}
                    data={duration}
                    renderItem={({ item }) =>
                        <Text onPress={() => { setIsactive(item.id) }} style={{ color: isactive === item.id ? '#fff' : '#000', backgroundColor: isactive === item.id ? '#000' : '#fff', fontSize: 15, fontWeight: '600', padding: 10, borderWidth: 1, borderRadius: 50, borderColor: 'lightgrey' }}>{item.value}</Text>
                    }
                    keyExtractor={item => item.id}
                />
            </View>

            <View>
                <FlatList
                    contentContainerStyle={{ marginBottom: 30 }}
                    data={statics}
                    renderItem={({ item }) =>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 16, marginVertical: 4 }}>{item.name}</Text>
                            <Text style={{ fontSize: 18, fontWeight: '900' }}>{item.price}</Text>
                        </View>
                    }
                    keyExtractor={item => item.id}
                />
            </View>

            <TouchableHighlight
                activeOpacity={1}
                underlayColor="#DDDDDD"
            >
                <View style={{ borderRadius: 10, height: 50, backgroundColor: '#000', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 20 }}>Add to Portfolio</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
}