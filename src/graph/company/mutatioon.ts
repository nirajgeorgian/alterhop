import { gql } from '@apollo/client'

export const mutationCreateCompany = gql`
	mutation CreateCompany($input: CompanyInput!) {
		CreateCompany(input: $input) {
			id
		}
	}
`

export const mutationCreateJob = gql`
	mutation CreateJob($input: JobInput!) {
		CreateJob(input: $input) {
			id
		}
	}
`
