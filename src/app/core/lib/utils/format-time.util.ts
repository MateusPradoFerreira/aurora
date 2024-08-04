export function formatTime(seconds: number) {
  // Calculate minutes and seconds
  var minutes = Math.floor(seconds / 60);
  var seconds = seconds % 60;

  // Ensure minutes and seconds are formatted with leading zeros if necessary
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

  // Format the result
  var formattedTime = formattedMinutes + ":" + formattedSeconds;

  return formattedTime.substring(0, 5);
};