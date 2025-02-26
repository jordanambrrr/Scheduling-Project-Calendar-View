let schedule = {
    wakeTime: null,
    bedTime: null,
    workStart: null,
    workEnd: null,
    tasks: []
};

// Convert time string (HH:MM) to minutes
function timeToMinutes(timeStr) {
    let [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
}

// Convert minutes to HH:MM format
function minutesToTime(minutes) {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

// Add Task to Schedule
function addTask() {
    let name = document.getElementById("taskName").value;
    let duration = parseInt(document.getElementById("taskDuration").value);
    let days = document.getElementById("taskDays").value.split(",").map(day => day.trim());
    let frequency = document.getElementById("taskFrequency").value;

    if (name && duration && days.length > 0) {
        schedule.tasks.push({ name, duration, days, frequency });
        alert("Task Added!");
    }
}

// Generate the Schedule
function generateSchedule() {
    schedule.wakeTime = timeToMinutes(document.getElementById("wakeTime").value);
    schedule.bedTime = timeToMinutes(document.getElementById("bedTime").value);
    schedule.workStart = timeToMinutes(document.getElementById("workStart").value);
    schedule.workEnd = timeToMinutes(document.getElementById("workEnd").value);

    let availableTime = {};
    let daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    // Initialize available time slots for each day
    daysOfWeek.forEach(day => {
        availableTime[day] = [];
        let start = schedule.wakeTime;
        while (start + 30 <= schedule.bedTime) {
            if (start >= schedule.workStart && start < schedule.workEnd) {
                start = schedule.workEnd; // Skip work hours
            }
            availableTime[day].push(start);
            start += 30;
        }
    });

    let finalSchedule = {};

    // Assign tasks
    schedule.tasks.forEach(task => {
        task.days.forEach(day => {
            if (!finalSchedule[day]) finalSchedule[day] = [];

            let assigned = false;
            for (let i = 0; i < availableTime[day].length; i++) {
                let startTime = availableTime[day][i];
                let endTime = startTime + task.duration;

                // Check if task fits
                if (endTime <= schedule.bedTime && !assigned) {
                    finalSchedule[day].push({ task: task.name, time: minutesToTime(startTime) });
                    availableTime[day] = availableTime[day].filter(t => t < startTime || t >= endTime);
                    assigned = true;
                }
            }
        });
    });

    // Display Schedule
    let output = "";
    for (let day of daysOfWeek) {
        output += `${day}:\n`;
        if (finalSchedule[day]) {
            finalSchedule[day].forEach(entry => {
                output += `  - ${entry.task} at ${entry.time}\n`;
            });
        } else {
            output += "  No tasks scheduled.\n";
        }
    }
    document.getElementById("scheduleOutput").textContent = output;
}

// Button to trigger schedule generation
document.body.insertAdjacentHTML("beforeend", '<button onclick="generateSchedule()">Generate Schedule</button>');
