### This is the complete documentation of the Football Dimes API

**Football Dimes Backend supports the following API endpoints:**

`GET` **/players**
  - Read the complete players list

> Sample request using cURL:

```
curl --location --request GET 'https://your-backend-url.com/players'
```

> Successful (200 status code) response is of the form:

```
{
    "data": [
        {
            "_id": "some_player_id",
            "player_name": "Lionel Messi",
            "description": "some_description"
            "name": "creator_name",
            "creator": "creator_id",
            "tags": ["goat", "psg", "argentina", ...],
            "selectedFile": "data:image/jpeg;base64... (base64 image)",
            "likes": ["user_id1", "user_id2", ... , "user_id(n)"],
            "comments": ["commaent1", "comment2", ... , "comment(n)"],
            "createdAt": "2021-XX-16T14:37:41.840Z"
        }, {
            "_id": "some_player_id_2",
             ...
        },
        ...
    ],
    "currentPage": 1,
    "numberOfPages": 30
}
```

`GET` **/players/:id**
  - Read a player by id

> Sample request using cURL:
```
curl --location --request GET 'https://your-backend-url.com/players/some_player_id'
```

> Successful (200 status code) response is of the form:

```
{
    "data": {
        "_id": "some_player_id",
        "player_name": "Memphis Depay",
        "description": "some_description",
        "name": "creator_name",
        "creator": "creator_id",
        "tags": ["tag1", "tag2", "tag3", ...],
        "selectedFile": "data:image/jpeg;base64 (image file)",
        "likes": ["user_id1", "user_id2", ...],
        "comments": ["comment1", "comment2", ...],
        "createdAt": "2021-XX-16T14:52:52.812Z",
        "articles": [array_of_news_articles (see newsapi.org documentation)]
     }
}
```

`GET` **/players/search**
  - Read a player by a particular tag / search query

> Search terms are sent as query params. Required query parameters include: searchQuery & tags (separated by commas). Sample request using cURL:

```
curl --location --request GET 'https://your-backend-url.com/players/search?searchQuery=ronaldo&tags=goat,striker'
```
> Same response as GET /players/:id. NOTE: If you want to leave out either of the search params, pass it as empty, for example: (/players/search?searchQuery="ronaldo"&tags=) OR (/players/search?searchQuery=&tags=madrid)

`POST` **/players**
  - Create a player card (authentication required)

`POST` **/players/:id/commentPlayer**
  - Comment on a player profile (authentication required)

`PATCH` **/players/:id**
  - Update a player card (authentication required, only the creator can update)

`PATCH` **/players/:id/likePlayer**
  - Like a player (authentication required)

`DELETE` **/players/:id**
  - Delete a player card (authentication required, only the creator can delete)

#### Authentication Endpoints:

`POST` **/user/signup**
  - Create an account
> Requires an object with firstName, lastName, email, password, and confirmPassword attributes. Any field should not be null. Sample request using cURL:

```
curl --location --request POST 'https://your-backend-url/user/signup' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'email=youremail@domain.com' \
--data-urlencode 'password=yourpassword' \
--data-urlencode 'confirmPassword=yourpassword' \
--data-urlencode 'firstName=Your First Name' \
--data-urlencode 'lastName=Your Second Name'
```

`POST` **/user/signin**
  - Sign in 
> Requires an object with email and password attributes. Any field should not be null. Sample request using cURL with dummy account data:

```
curl --location --request POST 'https://your-backend-url/user/signin' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'email=antonymarthel@gmail.com' \
--data-urlencode 'password=12345'
```
