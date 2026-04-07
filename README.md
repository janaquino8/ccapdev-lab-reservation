# **DLSULABS: A Computer Laboratory Reservation Web Application**
DLSULABS is a centralized web solution designed to streamline the reservation workflow for computer laboratories within the Gokongwei Building at De La Salle University. In a high-demand academic environment, managing hardware resources can be a logistical challenge. DLSULABS bridges the gap between students and laboratory technicians by providing a real-time, self-service platform for managing bookings across three specialized labs. By replacing manual or fragmented scheduling methods, the application ensures that lab resources are utilized efficiently while providing a transparent, easy-to-navigate interface for the DLSU community.

## **Prerequisites**
The following needs to be installed:
- Visual Studio Code 
- Node.js
- MongoDB

## **Running the Project on Visual Studio Code**
The terminals used to run the project are provided by VSCode on Windows 11. 
1. Clone this repository into your own machine.
2. Open the project folder in VSCode.
3. Change your directory to the project's server folder via terminal to start downloading server dependencies: **cd server**
4. Download all server dependencies: **npm install**
5. Populate the database with seed.ts: **npx tsx seed.ts** 
   If successful:
   <img width="1036" height="310" alt="image" src="https://github.com/user-attachments/assets/d74c04f4-9ebe-452a-8972-5ade43253932" />
   
6. Run database: **npm run dev**
   If successful:
   <img width="1804" height="219" alt="image" src="https://github.com/user-attachments/assets/a2edb447-e240-4ee5-bf34-06d9f17881cb" />
   
8. Go back to the main directory: **cd ..**
9. Change your directory to the project's client folder to start downloading client dependencies: **cd client**
10. Run the website: **npm run dev**
   If successful:
    <img width="577" height="178" alt="image" src="https://github.com/user-attachments/assets/f7934f29-8729-48b9-9d94-c1f54b7931c7" />
    
    Ctrl + Left Click on the http link Vite has given to test the website.

