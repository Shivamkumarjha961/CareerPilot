# SCOPE.md

## Project Scope

CareerPilot is an AI-powered placement preparation platform designed to help students manage their placement journey from a single dashboard.

The platform combines multiple placement-related tools including:

- ATS Resume Analysis
- GitHub Profile Analysis
- Job Tracking
- Career Recommendations
- Placement Dashboard

## Objectives

The main objective of CareerPilot is to reduce the complexity of placement preparation by providing students with one centralized platform.

## Features Implemented

### User Authentication
- User Registration
- User Login
- Secure JWT Authentication

### ATS Resume Analysis
- Resume Upload
- ATS Score Generation
- Resume Improvement Suggestions

### GitHub Profile Analysis
- Repository Analysis
- Profile Strength Evaluation
- Contribution Insights

### Job Tracking
- Save Job Applications
- Track Application Status
- Manage Placement Progress

### Career Recommendations
- AI-Based Recommendations
- Skill Gap Analysis
- Learning Suggestions

### Dashboard
- Centralized User Dashboard
- Performance Overview
- Placement Readiness Tracking

## Database Schema

### Users
- id
- name
- email
- password
- createdAt

### Resumes
- id
- userId
- resumeUrl
- atsScore
- feedback

### GitHubAnalysis
- id
- userId
- githubUsername
- profileScore
- recommendations

### Jobs
- id
- userId
- companyName
- role
- status
- appliedDate

### Recommendations
- id
- userId
- recommendationText
- createdAt

## Limitations

- Real recruiter integration is not implemented.
- ATS scoring uses AI-assisted analysis and may vary.
- Recommendations depend on user-provided data.
