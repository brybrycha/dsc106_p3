# SP24 MGT Course Waitlist Statistics at UC San Diego

This data visualization helps UCSD students to examine the popularity and competitiveness of each management course.

*By Bryan Cha & Chloe Kim*

## Project Introduction

For Business Economics major and minor students (like Bryan and Chloe), there are several management courses that the students are required to take: MGT16, MGT71, MGT12, MGT137, and MGT112. As there is no prerequisite course to take the five management courses, it is always a struggle for the students to decide when to enroll in the courses.
 There are two choices that the students can make. They can either enroll in 2 courses in the first pass or enroll in the second pass. As first pass increases the chance of getting into the class without getting waitlisted, students usually enroll in popular classes in firstpass. Without knowing the popularity of each course, it is hard to decide when to enroll in each course.
Bryan and Chloe thought distributing line graphs of management courses’ waitlist count records once every few days would give students a great insight into which courses out of 5 management courses are popular and which are not. Based on the trend of waitlist counts for each management course, it would give a great idea of which courses should be enrolled during first pass and second pass.

### Datasets Used in the project


Source: https://github.com/UCSD-Historical-Enrollment-Data

| Column          | Description   |
|-----------------|---------------|
| `time`       | date when the enrollment data was recorded      |
| `enrolled`       | enrolled students number       |
| `available`     | available seats number     |
| `waitlisted`          | waitlisted students number |
| `total`        | Total offered seats number |

We brought the data from UCSD-Enrollment-Data in github, and we confirmed the MIT license before using the data. We used enrollment data of MGT16, MGT71, MGT12, MGT137, and MGT112 from Spring quarter 2023-2024

---
## Data Cleaning and EDA

We concatenated enrollment history data of each course into one dataset and made a new column of course name. We used the new column of each course name to make 5 different line graphs using D3. As we are only using waitlisted number data, we deleted all the columns other than time, waitlisted, and name columns

> Checking Data Types

Let's look into their columns and datatypes.

This is 


| Column name     | Type          |
|-----------------|---------------|
| `time`       | date     |
| `waitlisted`          | int |
| `name`        | string |

<PlaceHolder for the Graph>

###  Rationale for Design Decisions

We decided to use line graphs in order to depict the trend of each course’s waitlist counts. Line graph is the most common type of chart to show the trends of increasing and decreasing over time. Along the line graph we used x-axis to show dates in spring quarter and y-axis to show the counts of waitlisted students from each course. We used D3 to depict the line graphs.

Also, we implemented two different interactive functions: Zoom-in and out with pan function, and Search function

#### Zoom-in and out function with pan function
The first function that we have implemented is the zoom-in and out function. It allows users to zoom in and out the visualization by scrolling on the graph, and they can also pan through the graph by moving the cursor. In order to implement the function, we implemented the d3.zoom() function. 

##### How did you choose your particular visual encodings and interaction techniques?

One possible inconvenience that users might experience is reading the data with a wide date scale on x-axis. Without zooming into the graph, the graph shows the waitlist counts data from February 18th to April 14th. Because the data visualization is depicting data within the 2 months and 7 days gap in between two grids on x-axis, it is hard to read the detailed data such as a data point of waitlist counts on a certain day. Also, it is hard to read the line graph solely with y-axis grids as the graphs contain so many changes within two months. Furthermore, it is fairly hard to read each line graph as there are five line graphs congregated in one data visualization With the zoom function that we implemented, now users can see the line graph with each point of waitlist counts with hours scale, and they can pan through the graph to find the certain date and time that users want to look at. Users can also pan through the line graph to read the point’s exact number as the y-axis scale gets smaller and accurate once users zoom in. It is way easier to read each line graph in data visualization as you can zoom into one specific line graph to look at. 

##### What alternatives did you consider and how did you arrive at your ultimate choices?

We thought about using a toolbox to describe each point’s number when you click into a certain point of one line graph. It would definitely make the visualization easier to look at, but it still would not solve problems of how it is hard to see the trend of waitlist counts of each line graph when 5 line graphs are congregated in one data visualization. Furthermore, the toolbox would be hard to use as it would take quite an effort to find the exact date on the graph that you are interested in looking at when the x-axis scale is big. It will take few trials to find the exact date on the graph. However, zoom in/out with pan function would solve all these cons while adding more pros into the visualization. 


#### Search function


The second function that we have implemented is the search function. It allows you to search the courses that you are interested in the search box, and it will only show the line graph of courses that you searched for. You can also search for the first number of mgt courses, and it will show all the courses that start with a certain number after the letter “mgt” that you typed in. 

##### How did you choose your particular visual encodings and interaction techniques?

Just like mgt16 line graphs and mgt 137 line graphs, there are several line graphs that intersect to each other. Due to the intersection with several graphs at the same time, it is hard for users to read the data especially when they want to look at specific points of each line graph when the x-axis scale is large. With the filter out function with search function, you can only look at line graphs that you are interested in, and you can hide all the other graphs that you are not interested in. Although each line graph is differentiated with different color of line, it is still hard to figure which line graph represents which course’s waitlist counts. With the search function, you can easily identify each line graph’s representation by simply typing an interested course’s name in the search bar.


##### What alternatives did you consider and how did you arrive at your ultimate choices?

We thought about having 5 different buttons that can filter out line graphs. For example, if you click a button with an mgt16 letter, the line graph will only show the mgt 16 waitlist line graph. However, this function will require 5 different buttons on the graph, and it will make the visualization distracting and messy. Furthermore, the search function allows users to filter out line graphs by typing common letters and numbers to see a few line graphs from courses with common letters and numbers. As I mentioned earlier, the search function adds another utility aspect where we can use the search function as identifying each line’s data representation. With more pros when we have search functions, we decided to add a search function for the data visualization.

###  Overview of Development Process



#### Describe how the work was split among the team members.


First day, we met up and discussed our ideas of how to make interactive visualization. We spent about 2-3 hours doing research and making a decision to make data visualization of waitlist counts in mgt courses with two different interactive functions.

We tried our best to split the work evenly. We started the project by researching and experimenting D3 functions. We watched videos such as:
https://www.youtube.com/watch?v=T1RgT0Yh1Lg&t=1321s - instruction of how to make line graph with D3
https://www.youtube.com/watch?v=ZNrG6sMNHeI&t=230s -  instruction of how to implement zoom function into data visualization.

We also studied with Lab4 and Lab5 instructions that guided us through how to use D3 to make interactive data visualization.

https://d3js.org/d3-zoom -  we used d3 by observable website to implement zoom function and search function.

We spent around 2 hours a day for 3 days researching and experimenting.

Bryan worked on Data cleaning and creating basic line graphs using cleaned data. Data cleaning took about an hour, and creating basic line graphs using D3 took about 4 hours.

Chloe worked on implementing search functions and modifying details of visualization to make the data visualization better looking. Implementing search functions took about 3 hours, and modifying details of visualization took about an hour. 

On May 13th, 2024, we had a last meeting to work on zoom in/zoom-out with pan function together. After implementing the function, we worked on write ups together. Implementing zoom in/zoom out function with pan function took about 5 hours. It required most of the time as there were lots to learn to use D3 zoom function, and the function kept creating the error. The most common error that we got was the zoom-in function working for only one time and not being able to zoom in and out again. Then, we worked on write up about an hour together.


Thank you




