# Termzinator

[Poster](./Termzinator%20Poster.png)

## About the Project
We are building a Chrome Extension that allows users to highlight the sections of their 
terms of service document that may be predatory. Furthermore, the extension translates the 
document into different languages. 

Our goal is to help users, especially those from minority communities, better understand 
these documents and make more informed decisions.

## Team Members
- [Lane Chin](https://github.com/lchin21)
- [Aadit Kamat](https://github.com/aaditkamat)
- [Yining Liu](https://github.com/iningliu1)
- [Miguel A. Restrepo](https://github.com/Mrest68)

## Backend

The backend is hosted using a Google Cloud Run Function. 

You can access it through [this endpoint](https://termsinator-backend-108092707474.us-central1.run.app/)

Here's a sample POST request to the endpoint:

```json
{
    "method": "POST",
    "body": {
        "prompt": "This is a sample text"
    },
    "headers": {
        "Content-type": "application/json; charset=UTF-8"
    }
}
```
## Frontend (Loading the Chrome Extension)

1. Go to `chrome://extensions/` in your Chrome browser.
2. Turn on Developer Mode.
3. Click on "Load Unpacked".
4. Select the `frontend` folder in the repository.




