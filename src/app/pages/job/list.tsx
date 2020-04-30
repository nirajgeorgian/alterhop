import React from 'react';
import { Spin } from 'antd';
import Job from '../../../components/job'
import { List } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

// Dummy Data
const job = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": "Software Engineer",
    "description": "<p>Google aspires to be an organization that reflects the globally diverse audience that our products and technology serve. We believe that in addition to hiring the best talent, a diversity of perspectives, ideas and cultures leads to the creation of better products and services.</p>",
    "identifier": {
        "@type": "PropertyValue",
        "name": "Google",
        "value": "1234567"
    },
    "datePosted": "2017-01-18",
    "validThrough": "2017-03-18T00:00",
    "employmentType": "CONTRACTOR",
    "hiringOrganization": {
        "@type": "Organization",
        "name": "Google",
        "sameAs": "http://www.google.com",
        "logo": "https://naseem.js.org/static/projects/oyebooks.webp"
    },
    "jobLocation": {
        "@type": "Place",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "1600 Amphitheatre Pkwy",
            "addressLocality": ", Mountain View",
            "addressRegion": "CA",
            "postalCode": "94043",
            "addressCountry": "US"
        }
    },
    "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": {
            "@type": "QuantitativeValue",
            "value": 40.00,
            "unitText": "HOUR"
        }
    }
};

const listData = [job];

for (let i = 1; i < 25; i++) {
    listData.push(job);
}

class JobList extends React.Component {

    state = {
        listData: listData,
        loading: false,
        hasMore: true,
    };

    handleInfiniteOnLoad = () => {
        let { listData } = this.state;
        this.setState({
            loading: true,
        });

        // To check if all items are loaded
        // if (listData.length >= 23) {
        //     message.warning('Infinite List loaded all');
        //     this.setState({
        //         hasMore: false,
        //         loading: false,
        //     });
        //     return;
        // }

        // Do Data Fetching then setLoading false
        this.setState({
            loading: false,
            hasMore: false
        })
    };

    render(): JSX.Element {
        return (
            <div style={{
                border: "1px solid #e8e8e8",
                borderRadius: "4px",
                overflow: "auto",
                padding: "8px 24px",
                height: "600px"
            }}>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!this.state.loading && this.state.hasMore}
                    useWindow={false}
                >
                    <List
                        itemLayout="vertical"
                        size="default"
                        // pagination={{
                        //     onChange: page => {
                        //         console.log(page);
                        //     },
                        //     pageSize: 5,
                        // }}
                        dataSource={this.state.listData}
                        renderItem={item => (
                            <List.Item
                                key={item.title}>
                                <Job item={item} />
                            </List.Item>
                        )}
                    >
                        {this.state.loading && this.state.hasMore && (
                            <div className="loading-container" style={{
                                position: "absolute",
                                bottom: "40px",
                                width: "100%",
                                textAlign: "center",
                            }}>
                                <Spin />
                            </div>
                        )}
                    </List>
                </InfiniteScroll>
            </div>
        )
    }
}

export default JobList;