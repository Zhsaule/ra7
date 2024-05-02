import { useState, useEffect } from 'react';
import moment from 'moment';

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    );
}

const withPrettyDate = (Component) => {
    const PrettyDateComponent = (props) => {
        const [prettyDate, setPrettyDate] = useState("");

        useEffect(() => {
            const now = moment();
            const givenDate = moment(props.date);
            const diffMinutes = now.diff(givenDate, 'minutes');
            const diffHours = now.diff(givenDate, 'hours');
            const diffDays = now.diff(givenDate, 'days');

            if (diffMinutes < 60) {
                setPrettyDate(`${diffMinutes} минут назад`);
            } else if (diffHours < 24) {
                setPrettyDate(`${diffHours} часов назад`);
            } else {
                setPrettyDate(`${diffDays} дней назад`);
            }
        }, [props.date]);

        return <Component {...props} date={prettyDate} />;
    };

    PrettyDateComponent.displayName = `withPrettyDate(${Component.displayName || Component.name || 'Component'})`;
    return PrettyDateComponent;
};

const DateTimePretty = withPrettyDate(DateTime);

function Video(props) {
    return (
        <div className="video">
            <iframe 
                src={props.url} 
                style={{ border: '0' }}
                allow="autoplay; encrypted-media" 
                allowFullScreen></iframe>
            <DateTimePretty date={props.date} />
        </div>
    );
}

function VideoList(props) {
    return props.list.map(item => (
        <Video key={item.url} url={item.url} date={item.date} />
    ));
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-07-31 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}
