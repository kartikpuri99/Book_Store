# Book Store
It is book store website made using MERN stack.It allows person to look for different books from different the book catalog and can order them.For payment PayPal API is used and custom authentication using jwt token is done.Website also contains a admin section for the admin of the website who can create,delete,update new products as well as can make other users admin as well.

<br/>

![alt text](https://github.com/kartikpuri99/Book_Store/blob/master/frontend/public/images/demo1.JPG "Image 1")
![alt text](https://github.com/kartikpuri99/Book_Store/blob/master/frontend/public/images/demo2.JPG "Image 2")
![alt text](https://github.com/kartikpuri99/Book_Store/blob/master/frontend/public/images/demo3.JPG "Image 3")


# Tech Stack

* ReactJS
* NodeJS
* MongoDB
* BootStrap
* CSS3


# How to run the file
1. clone the github repo on your local desktop.
2. Run `yarn i` or `npm i` in the root folder.
3. Now open the frontend folder in the terminal and run `yarn i` or `npm i`.
4. In the root folder create a file named `.env` and add the following code:
   ```javascript
    NODE_ENV = development
    PORT = 5000
    MONGO_URI = // YOUR MONGODB URL
    JWT_SECRET = // YOUR JWT SECRET STRING
    PAYPAL_CLIENT_ID = //YOUR PAYPAL CLENT ID
   ```
5. Now open the terminal in root folder and run `npm run dev` to website.
