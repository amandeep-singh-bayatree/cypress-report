# Cypress Test Automation with GitHub Actions & S3 Reporting

This repository contains automated Cypress tests that run on a schedule using **GitHub Actions**. The JSON reports generated from the test runs are uploaded to an **Amazon S3 bucket**, and a `filenames.json` file is maintained to track all uploaded report filenames.

## 🔧 Features

- Runs selected Cypress specs on a **daily schedule (12:00 AM Asia/Kolkata)**
- Uploads Cypress JSON test reports to **Amazon S3**
- Appends each uploaded filename to `filenames.json` stored in the same S3 bucket
- Optionally uploads reports to GitHub as an **artifact**

## 📁 Directory Structure

```bash
cypress/
└── e2e/
    ├── admin
    ├── Chat
    └── forms

cypress/reports/
└── *.json
```
## ⚙️ GitHub Actions Workflow

Located in `.github/workflows/main.yml`.  
Runs at **12:00 AM Asia/Kolkata** every day using cron.

### Schedule Trigger

```yaml
on:
  schedule:
    - cron: '30 6 * * *'  #12:00 AM Asia/Kolkata (UTC+5:30)
```
### Workflow Overview

- Install dependencies
- Run selected Cypress test specs
- Upload all generated JSON reports to S3
- Update the filenames.json object in S3
- Upload JSON reports to GitHub artifact (optional)

## 🔐 Required Secrets

Set the following GitHub secrets under **Repository → Settings → Secrets → Actions:**

| Secret Name | Description                |
| :-------- | :------------------------- |
| `AWS_ACCESS_KEY_ID` | IAM user's access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user's secret key |
| `AWS_REGION` | AWS region (e.g. us-east-1) |

## 📦 Output in S3

Each run uploads:
- cypress/reports/*.json → s3://your-bucket-name/hxc/
- Appends each uploaded filename to s3://your-bucket-name/hxc/filenames.json

## 📝 Example filenames.json

```json
{
  "projectName": "HXC",
  "filenames": [
    "Report_04-24-2025_13-03-21.json",
    "Report_04-25-2025_17-04-58.json"
  ]
}
```

## ✅ Notes

- ✅ Works in private repositories
- 🕒 Runs daily at 12:00 AM IST (Asia/Kolkata) via cron
- 🔒 All AWS credentials are securely stored in GitHub Secrets