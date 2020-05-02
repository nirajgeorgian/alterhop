/*
 * Created on Sun April 30 2020
 *
 * @className JobComponent .
 * This file represents the /company/job Route List.
 *
 * @author naseemali925@gmail.com (Naseem Ali)
 *
 * Copyright (c) 2020 - oojob
 */

import React, { useState } from 'react'

import Job from '../../../components/job'
import PadColContainer from 'components/layout/pad-col-container'
import styles from './style.module.less'

// Dummy Data
const job = {
	'@context': 'https://schema.org/',
	'@type': 'JobPosting',
	title: 'Software Engineer',
	description:
		'<p>Google aspires to be an organization that reflects the globally diverse audience that our products and technology serve. We believe that in addition to hiring the best talent, a diversity of perspectives, ideas and cultures leads to the creation of better products and services.</p>',
	identifier: {
		'@type': 'PropertyValue',
		name: 'Google',
		value: '1234567'
	},
	datePosted: '2017-01-18',
	validThrough: '2017-03-18T00:00',
	employmentType: 'CONTRACTOR',
	hiringOrganization: {
		'@type': 'Organization',
		name: 'Google',
		sameAs: 'http://www.google.com',
		logo: 'https://naseem.js.org/static/projects/oyebooks.webp'
	},
	jobLocation: {
		'@type': 'Place',
		address: {
			'@type': 'PostalAddress',
			streetAddress: '1600 Amphitheatre Pkwy',
			addressLocality: ', Mountain View',
			addressRegion: 'CA',
			postalCode: '94043',
			addressCountry: 'US'
		}
	},
	baseSalary: {
		'@type': 'MonetaryAmount',
		currency: 'USD',
		value: {
			'@type': 'QuantitativeValue',
			value: 40.0,
			unitText: 'HOUR'
		}
	}
}

const listData = [job]

for (let i = 1; i < 25; i++) {
	listData.push(job)
}

const JobComponent: React.FC = () => {
	const [data, setListData] = useState(listData)
	const [loading, setLoading] = useState(false)
	const [hasMore, setHasMore] = useState(true)
	const [active, setActive] = useState(0)

	const handleInfiniteOnLoad = () => {
		setLoading(true)

		// To check if all items are loaded
		// if (data.length >= 23) {
		//     message.warning('Infinite List loaded all');
		// setLoading(false);
		// setHasMore(false);
		//     return;
		// }

		// Do Data Fetching then setLoading false
		setLoading(false)
		setHasMore(false)
	}

	const handleListItemClick = (key) => {
		setActive(key)
	}

	const JobList = () => (
		<div className={styles['job-list']}>
			{data.map((job, key) => (
				<Job key={key} item={job} active={active === key} />
			))}
		</div>
	)

	const JobView = () => <></>

	return (
		<PadColContainer side={<JobList />} sideSpan={10} contentSpan={13} spacing={1}>
			<JobView />
		</PadColContainer>
	)
}

export default JobComponent
