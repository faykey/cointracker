import React, { useEffect, useState, useContext } from 'react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from 'recharts';
import { CoinContext } from '../../context/CoinContext';

const ChartComponent = ({ coinID }) => {
    const { currency } = useContext(CoinContext);
    const [data, setData] = useState([]);
    const [timeframe, setTimeframe] = useState('7'); // default is 7D

    const isMobile = window.innerWidth < 768;

    useEffect(() => {
        const fetchHistoricalData = async () => {
            try {
                let formatted = [];

                if (timeframe === '1') {
                    // Use CryptoCompare for hourly 24H data
                    const symbol = coinID.toUpperCase(); // CoinGecko uses lowercase IDs, CC uses symbols
                    const ccSymbolMap = {
                        bitcoin: 'BTC',
                        ethereum: 'ETH',
                        solana: 'SOL',
                        tether: 'USDT',
                        // Add more mappings as needed
                    };
                    const fsym = ccSymbolMap[coinID] || 'BTC';
                    const tsym = currency.name.toUpperCase();

                    const res = await fetch(
                        `https://min-api.cryptocompare.com/data/v2/histohour?fsym=${fsym}&tsym=${tsym}&limit=24`,
                        {
                            headers: {
                                authorization: `Apikey ${import.meta.env.VITE_CC_API_KEY}`,
                            },
                        }
                    );
                    const result = await res.json();

                    formatted = result.Data.Data.map((item) => {
                        const date = new Date(item.time * 1000);
                        return {
                            date: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            price: item.close,
                        };
                    });
                } else {
                    // Use CoinGecko for longer timeframes
                    const interval = 'daily';
                    const res = await fetch(
                        `https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=${currency.name}&days=${timeframe}&interval=${interval}`,
                        {
                            headers: {
                                accept: 'application/json',
                                'x-cg-demo-api-key': import.meta.env.VITE_CG_API_KEY,
                            },
                        }
                    );
                    const result = await res.json();

                    formatted = result.prices.map((item) => {
                        const date = new Date(item[0]);
                        return {
                            date: `${date.toLocaleDateString(undefined, { month: 'short' })} ${date.getDate()}`,
                            price: item[1],
                        };
                    });
                }

                setData(formatted);
            } catch (err) {
                console.error('Failed to fetch chart data:', err);
            }
        };

        fetchHistoricalData();
    }, [coinID, currency.name, timeframe]);
      

    const timeframes = [
        { label: '24H', value: '1' },
        { label: '7D', value: '7' },
        { label: '30D', value: '30' },
        { label: '90D', value: '90' },
        { label: '1Y', value: '365' },
    ];

    return (
        <div style={{ width: '100%' }}>
            {/* Timeframe selector */}
            <div
                style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '12px',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                }}
            >
                {timeframes.map((t) => (
                    <button
                        key={t.value}
                        onClick={() => setTimeframe(t.value)}
                        style={{
                            padding: '6px 16px',
                            borderRadius: '20px',
                            backgroundColor: timeframe === t.value ? '#00e0aa' : 'transparent',
                            border: '1px solid #00e0aa',
                            color: timeframe === t.value ? '#0a0f1a' : '#00e0aa',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: '14px',
                        }}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Chart */}
            <div
                style={{
                    width: '100%',
                    height: isMobile ? '260px' : '320px',
                    paddingLeft: isMobile ? '8px' : '24px',
                    paddingRight: isMobile ? '8px' : '24px',
                }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: isMobile ? 10 : 20,
                            left: isMobile ? 35 : 50,
                            bottom: isMobile ? 35 : 50,
                        }}
                    >
                        <CartesianGrid stroke="#2a2a2a" strokeDasharray="3 3" />

                        <XAxis
                            dataKey="date"
                            stroke="#ccc"
                            angle={-45}
                            textAnchor="end"
                            interval="preserveStartEnd"
                            tick={{ fontSize: isMobile ? 10 : 12 }}
                            height={60}
                        />

                        <YAxis
                            stroke="#ccc"
                            width={isMobile ? 60 : 75}
                            domain={['dataMin - 5', 'dataMax + 5']}
                            tickFormatter={(value) =>
                                `${currency.symbol}${value.toLocaleString()}`
                            }
                            tick={{ fontSize: isMobile ? 10 : 12 }}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0a0f1a',
                                border: '1px solid #00e0aa',
                                color: '#fff',
                            }}
                            labelStyle={{ color: '#00e0aa' }}
                            formatter={(value) =>
                                `${currency.symbol}${value.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}`
                            }
                        />

                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#00e0aa"
                            strokeWidth={2.5}
                            fill="#00e0aa"
                            fillOpacity={0.15}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ChartComponent;
