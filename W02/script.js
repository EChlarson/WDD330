// Get references to the countdown display and buttons
const countdownDisplay = document.getElementById("countdown");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const timeInput = document.getElementById('timeInput');

// Set the starting time for the countdown (in seconds)
let countdownTime = 10;
let countdownInterval; // To store the interval
let isPaused = false;  // To track if the countdown is paused

// Function to start or resume the countdown
function startCountdown() {
   // Get custom time from input if it's provided and valid
   const customTime = parseInt(timeInput.value);
   if (customTime > 0) {
      countdownTime = customTime; // Set countdownTime to custom time
      timeInput.value = '';       // Clear the input field after setting the time
   }

   if (!countdownInterval) {
      
      // Set the interval to decrement the countdown every second
      countdownInterval = setInterval(() => {
         if (!isPaused && countdownTime > 0) {
            countdownTime--;
            countdownDisplay.textContent = countdownTime;
         }

         // Check if the countdown reached 0
         if (countdownTime <= 0) {
            clearInterval(countdownInterval);  // Stop the countdown
            countdownInterval = null;          // Reset interval
            countdownDisplay.textContent = "Time's up!";  // Display message
         }
      }, 1000);
   }
}

// Event listener for the Start button
startButton.addEventListener('click', () => {
   isPaused = false;  // Reset pause state
   startCountdown();  // Start the countdown
});

// Event listener for the Pause button
pauseButton.addEventListener('click', () => {
   isPaused = !isPaused;
});
