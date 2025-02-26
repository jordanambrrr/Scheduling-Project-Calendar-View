# Scheduling-Project-Calendar-View

Task Scheduler

~A simple web app that helps you automatically plan your tasks around your workday and sleep schedule~


How It Works:
This app takes your daily schedule and finds the best time to fit in your tasks without messing up your work hours or sleep. Just tell it what tasks you need to do, how long they take, and how often you'd like to do them—and it'll build your schedule for you.


What You'll Need to Input

- Wake-up Time: Enter as HH:MM in 24-hour format (e.g., 07:00 for 7 AM).
Bedtime: Enter as HH:MM in 24-hour format (e.g., 22:30 for 10:30 PM).
Work Hours:
- Work Start: Enter as HH:MM in 24-hour format (e.g., 09:00 for 9 AM).
- Work End: Enter as HH:MM in 24-hour format (e.g., 17:00 for 5 PM).
Tasks:
- Task Name: Enter as a string (e.g., "Workout").
- Task Duration: Enter as an integer representing minutes (e.g., 45 for 45 minutes).
- Preferred Days: Enter as a comma-separated string (e.g., "Mon,Wed,Fri").
- Frequency: Enter as "Daily" or "Weekly".


Example Terminal Input:

Wake-up Time: 07:00
Bedtime: 22:30
Work Start: 09:00
Work End: 17:00
Task Name: Workout
Task Duration: 45
Preferred Days: Mon,Wed,Fri
Frequency: Weekly


How to Use It:
1. Fill out your wake-up, bedtime, and work hours.
2. Add as many tasks as you want with their details.
3. Hit Generate Schedule and see your personalized plan!

What's Next?
This is a basic version—but there's a lot more that could be added...
- A visual calendar view
- Prioritizing certain tasks over others
- Drag-and-drop task editing
- Saving your schedule locally

###

Possible Enhancements:
- Improve UI with a calendar-style schedule.
- Add drag-and-drop task adjustment.
- Store schedule using local storage for persistence.
- Allow rescheduling or priority-based sorting of tasks.

###

Adding a Visual Calendar View:
To enhance the usability of the scheduler, integrate a visual calendar using JavaScript and an open-source library like FullCalendar.js. This will allow users to see their tasks visually represented on a weekly or monthly calendar.

Steps to Implement:
1. Include the FullCalendar.js library in your project.
2. Convert the scheduled tasks into calendar events.
3. Render the calendar in an HTML container.
4. Allow users to interact with and adjust tasks dynamically.


Example Code Snippet:
<div id="calendar"></div>
<script>
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek',
        events: [
            { title: 'Workout', start: '2025-02-26T07:00:00', end: '2025-02-26T07:45:00' },
            { title: 'Work', start: '2025-02-26T09:00:00', end: '2025-02-26T17:00:00' }
        ]
    });
    calendar.render();
});
</script>

###

How to Add FullCalendar.js:

You have two main ways to add FullCalendar to your project:
1. Using a CDN (Recommended for Simplicity) 

Steps:
1. Open your index.html file.
2. Add the FullCalendar script inside the <head> section.
3. Add a <div> element where the calendar will be displayed.

Example index.html (With FullCalendar CDN): 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Task Scheduler</title>
    <script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js"></script>
</head>
<body>
    <div id="calendar"></div>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            var calendarEl = document.getElementById("calendar");
            var calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: "dayGridMonth"
            });
            calendar.render();
        });
    </script>
</body>
</html>

###

2. Using NPM

If you're using a Node.js environment and want more control, you should install FullCalendar using NPM.

Steps:
1. Navigate to your project folder in your terminal.
2. Run this command to install FullCalendar:
"npm install fullcalendar"

3. Create a new JavaScript file (e.g., calendar.js) and import FullCalendar.

Example calendar.js:
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

document.addEventListener("DOMContentLoaded", function() {
    var calendarEl = document.getElementById("calendar");
    var calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin],
        initialView: "dayGridMonth"
    });
    calendar.render();
});

4. Then, modify your index.html file to include the script:
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Task Scheduler</title>
</head>
<body>
    <div id="calendar"></div>
    <script type="module" src="calendar.js"></script>
</body>
</html>
