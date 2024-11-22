const targetDate = "2024-11-22T19:00:00";

//Pass in needed HTML
function getTimeSegmentElements(segmentElement) {
   const segmentDisplay = segmentElement.querySelector(".segment-display");
   const segmentDisplayTop = segmentDisplay.querySelector(".segment-display_top");
   const segmentDisplayBottom = segmentDisplay.querySelector(".segment-display_bottom");
   const segmentOverlay = segmentDisplay.querySelector(".segment-overlay");
   const segmentOverlayTop = segmentOverlay.querySelector(".segment-overlay_top");
   const segmentOverlayBottom = segmentOverlay.querySelector(".segment-overlay_bottom");

   return {
      segmentDisplayTop, segmentDisplayBottom, segmentOverlay, segmentOverlayTop, segmentOverlayBottom
   }
};

//Update text values in segments
function updateSegmentValues(displayElement, overlayElement, value) {
   displayElement.textContent = value;
   overlayElement.textContent = value;
};

//Update and animate a segment
function updateTimeSegment (segmentElement, timeValue) {
   //Grab HTML Data from the previous function where it was passed
   const segmentElements = getTimeSegmentElements(segmentElement);

   if(parseInt(segmentElements.segmentDisplayTop.textContent, 10) === timeValue) {
      return;
   }

   //class change causes animation
   segmentElements.segmentOverlay.classList.add('flip');
   
   //Change text values 
   updateSegmentValues(
      segmentElements.segmentDisplayTop,
      segmentElements.segmentOverlayBottom,
      timeValue
   );


   function finishAnimation() {
      segmentElements.segmentOverlay.classList.remove('flip');
      updateSegmentValues (
         segmentElements.segmentDisplayBottom,
         segmentElements.segmentOverlayTop,
         timeValue
      );

      this.removeEventListener('animationend', finishAnimation);
   }

   segmentElements.segmentOverlay.addEventListener('animationend', finishAnimation);
};

function updateTimeSection(sectionID, timeValue) { //If we pass 14
   const firstNumber = Math.floor(timeValue/10) || 0; //returns 1
   const secondNumber = Math.floor(timeValue%10) || 0; //returns 4

   const sectionElement = document.getElementById(sectionID);
   const timeSegments = sectionElement.querySelectorAll('.time-segment');

   updateTimeSegment(timeSegments[0], firstNumber);
   updateTimeSegment(timeSegments[1], secondNumber);
};

//Time Calculation
function getTimeRemaining(targetDateTime) {
   const nowTime = Date.now();
   const secondsRemaining = Math.floor((targetDateTime - nowTime) / 1000);

   const complete = nowTime >= targetDateTime;
   if (complete) {
      return {
         complete, seconds: 0, minutes: 0, hours: 0
      }
   }

   const hours = Math.floor(secondsRemaining /60/60);
   const minutes = Math.floor(secondsRemaining /60) - hours * 60;
   const seconds = secondsRemaining %60;

   return {
      complete, seconds, minutes, hours
   }
};

function updateAllSegments() {
   const timeRemainingBits = getTimeRemaining( new Date(targetDate).getTime());

   updateTimeSection('seconds', timeRemainingBits.seconds)
   updateTimeSection('minutes', timeRemainingBits.minutes)
   updateTimeSection('hours', timeRemainingBits.hours)

   return timeRemainingBits.complete;
};

const countdownTimer = setInterval(() => {
   const isComplete = updateAllSegments();

   if (isComplete) {
      clearInterval(countdownTimer);
   }
}, 1000);

updateAllSegments();