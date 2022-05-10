### Todo-api

##### Instructions:
1. Step to install npm package.

```
npm install
```
2. Step to create .env
```
create .env file and add DB_CONNECTION=dbURI, replace dbURI with mongodb credentials
```
3. Step to run
```
node app.js
```
##### Method and Url:
1. Create a list: POST
```
http://localhost:3000/api/v1/list/new
```
2. Show all lists: GET
```
http://localhost:3000/api/v1/list
```
3. Update a list: PUT
```
http://localhost:3000/api/v1/list/[id]
```
3. Delete a list: DEL
```
http://localhost:3000/api/v1/list/[id]
```
**Example Body in JSON**
```
{
    "name":"Learn python",
    "description":"refer course in udemy"
}
```