<!-- ABOUT THE PROJECT -->
## About The Project

This is a small application that manages courses

* Displays available courses in a table.
* Creates new courses
* Deletes courses
* Search by description

### Built With

* REACT
* Bootstrap
* .NetCore
* MySql

<!-- GETTING STARTED -->
## How To Run The Project

To run this project on your local machine follow the steps:

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Natysg134/CivitasHomeAssesment.git
   ```
2. On MySql workbench run the file databaseScripts located at ..\CivitasHomeAssesment\dataBase
3. For the back end solution, on a visual code/visual studio editor open the folder located at 
..\CivitasHomeAssesment\backEnd. Build and run the application. Once The BackEnd is up, it'll be
running on port: 5250 and swagger will be propmted, as follow:

![Swagger](https://github.com/Natysg134/CivitasHomeAssesment/blob/635e2c2ba6c682712d6485cf54dd891bd51e81ff/media/swagger.png?raw=true)

4. For the Front End Solution, open the folder located at ..\CivitasHomeAssesment\frontEnd. 
5. Open a console, navigate to the folder path.
6. Install NPM packages
   ```sh
   npm install
   ```
4. Run the app
  ```sh
   npm start
   ```
5. Wait for the app tu start on the browser

*There's a docker file for every solution, but is not working, an ERR:Connection error is happening when try to connect to the DB.

## Testing the funciontality

1. When you first loading the app, if you already run the Database script, you should see a record on the table.
The table looks like this 
![Results table](https://github.com/Natysg134/CivitasHomeAssesment/blob/332cff147902978523a013c381474686c4b777ad/media/TableResults.png?raw=true)
2. A  for the Loading State, to show the user that the app is busy at the moment. 
![LoadingState](https://github.com/Natysg134/CivitasHomeAssesment/blob/332cff147902978523a013c381474686c4b777ad/media/loadingState.png?raw=true)
3. For the Create a New Course click on the blue button on the botton left corner and a modal will be display:
![LoadingState](https://github.com/Natysg134/CivitasHomeAssesment/blob/332cff147902978523a013c381474686c4b777ad/media/createNewVal.png?raw=true)
Here's a validation if the Course Number has more than 3 characters, if it has less than 3 it will be formatted as a three-digit, zero-padded 
integer like "33" => "033".
4. There's also a validation for duplicated courses, you cannot repeat CourseNumber or Subject
![LoadingState](https://github.com/Natysg134/CivitasHomeAssesment/blob/332cff147902978523a013c381474686c4b777ad/media/DuplicateVal.png?raw=true)
5. The application allows the user to search for a course by description, with partial matches like "Stat" will show "Business Statistics" and 
"Med Stats". To clean Search, just leave the inpunt in blank and press search, all available data will be fetch.
![LoadingState](https://github.com/Natysg134/CivitasHomeAssesment/blob/332cff147902978523a013c381474686c4b777ad/media/searchResults.png?raw=true)
6. To delete a course, just click on the Delete Button
7. Additionally there's an update description funtionality, that opens a modal and you can edit tha field.