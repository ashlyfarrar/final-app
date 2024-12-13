# GPA Calculator App
This is my final project for CIT380

## About the GPA calculator
My goal for this project is to create a fully functioning GPA calculator application that allows users to calculate their GPA based on their course grades and credit hours. 

### Current Features
- User login
- Input course details (course name, grades, credit hours)
- Calculate GPA based on input data
- Store course information in MySQL database

Design inspiration from the lecture videos by Morgan Worrell and this full stack tutorial by Nsquared Coding https://www.youtube.com/watch?v=vrj9AohVhPA
<br /><br />

## How to run 
### 1. Create mySQL database for the project
in cmd prompt type mysql -u root -p, insert your password, then paste the text below
``` mysql
CREATE DATABASE IF NOT EXISTS gpa_calc;

USE gpa_calc;

CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    credit_hours INT NOT NULL,
    grade DECIMAL(3, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
```
<br />

### 2. Clone github repository by downloading .zip or using git commands
navigate to your desired directory
``` git
git clone https://github.com/ashlyfarrar/final-app
```
> NOTE: you may need to change the .env file located at \final-app\web-server\\.env to match your database credentials
<br />

### 3. Open two instances of command prompt. You will need one to run the front-end and another to run the back-end.
front-end, first command prompt
```
cd final-app\gpa-calculator-app
```
```
node server/index.js
```
back-end, second command prompt
```
cd final-app\web-server
```
```
node src/server.js
```
<br />

### 4. Finally, go to http://localhost:4000 in your browser of choice. You should be able to add courses and see your calculated GPA.
