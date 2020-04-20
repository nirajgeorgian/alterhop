import { gql } from '@apollo/client'

export const queryCompanyById = gql`
	query {
		ReadCompany(input: String!) {
			name
			description
			createdAt {
				seconds
				nanos
			}
			createdBy
			url
			logo
			noOfEmployees {
				min
				max
			}
			skills
			hiringStatus
			location
		}
	}
`
