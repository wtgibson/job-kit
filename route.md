# Routes

## Application

- ```GET``` all applications for user
- ```GET``` unique application by id
- ```GET``` all of elements from application field (titles, type, industry, zipcode, rating)
- ```POST``` application
- ```PUT``` application
- ``` DELETE ``` application

### Filter Routes:
Returns all applications that meet filter 
- By title
- By zipCode
- By Rating

## Company
- ```GET``` all companies for user
- ```GET``` unique user using id
- ```GET``` all of elements from company field (name, zipCode)
- ```POST``` company

#### Put & Delete can be added
- If company is used for multiple users we don't want to update or delete
- If company is a new instance for each application we may want to allow for update

#### Filter Routes can be added

## Contact
- ```GET``` all contacts for an application
- ```GET``` all contacts for a company
- ```GET``` unique contact using id
- ```POST``` contact
- ```PUT``` contact
- ```DELETE``` contact
#### Filter Routes can be added

## Source

- ```GET``` all sources from an application
- ```GET``` unique source using id
- ```GET``` all of elements from source field (source, linkToPosting, jobID, applyType, resumeVersion)
- ```POST``` source
- ```PUT``` source
- ```DELETE``` source
#### Filter Routes:
- By source (linkedIn, GitHub)
- By resumeVersion

## Stage

- ```GET``` all stages from an application
- ```GET``` unique stage using id
- ```POST``` stage
- ```PUT``` stage
- ```DELETE``` stage
#### Filter Routes:
- By current stage

## User

- ```GET``` user profile by id
- ```GET``` route to logout
- ```POST``` signup a new authenticated user
- ```PUT``` login and return id for authenticated user
- ```PUT``` update user information
#### Filter Routes:

## Html

#### Get
#### Post
#### Put
#### Delete
#### Filter Routes:
