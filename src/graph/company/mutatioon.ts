import { gql } from '@apollo/client'

export const mutationCreateCompany = gql`
	mutation CreateCompany($input: CompanyInput!) {
		CreateCompany(input: $input) {
			id
		}
	}
`
