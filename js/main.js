var hoursContainer = document.querySelector('.hours')
var minutesContainer = document.querySelector('.minutes')
var secondsContainer = document.querySelector('.seconds')
var tickElements = Array.from(document.querySelectorAll('.tick'))

var last = new Date(0)
last.setUTCHours(-1)

var tickState = true

function updateTime () {
  var now = new Date
  
  var lastHours = last.getHours().toString()
  var nowHours = now.getHours().toString()
  if (lastHours !== nowHours) {
    updateContainer(hoursContainer, nowHours)
  }
  
  var lastMinutes = last.getMinutes().toString()
  var nowMinutes = now.getMinutes().toString()
  if (lastMinutes !== nowMinutes) {
    updateContainer(minutesContainer, nowMinutes)
  }
  
  var lastSeconds = last.getSeconds().toString()
  var nowSeconds = now.getSeconds().toString()
  if (lastSeconds !== nowSeconds) {
    //tick()
    updateContainer(secondsContainer, nowSeconds)
  }
  
  last = now
}

function tick () {
  tickElements.forEach(t => t.classList.toggle('tick-hidden'))
}

function updateContainer (container, newTime) {
  var time = newTime.split('')
  
  if (time.length === 1) {
    time.unshift('0')
  }
  
  
  var first = container.firstElementChild
  if (first.lastElementChild.textContent !== time[0]) {
    updateNumber(first, time[0])
  }
  
  var last = container.lastElementChild
  if (last.lastElementChild.textContent !== time[1]) {
    updateNumber(last, time[1])
  }
}

function updateNumber (element, number) {
  //element.lastElementChild.textContent = number
  var second = element.lastElementChild.cloneNode(true)
  second.textContent = number
  
  element.appendChild(second)
  element.classList.add('move')

  setTimeout(function () {
    element.classList.remove('move')
  }, 990)
  setTimeout(function () {
    element.removeChild(element.firstElementChild)
  }, 990)
}

setInterval(updateTime, 100)














var defaults = {}
  , one_second = 1000
  , one_minute = one_second * 60
  , one_hour = one_minute * 60
  , one_day = one_hour * 24
  , startDate = new Date()
  , face = document.getElementById('lazy');

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
var requestAnimationFrame = (function() {
  return window.requestAnimationFrame       || 
         window.webkitRequestAnimationFrame || 
         window.mozRequestAnimationFrame    || 
         window.oRequestAnimationFrame      || 
         window.msRequestAnimationFrame     || 
         function( callback ){
           window.setTimeout(callback, 1000 / 60);
         };
}());

tick();

function tick() {

  var now = new Date()
    , elapsed = now - startDate
    , parts = [];

  parts[0] = '' + Math.floor( elapsed / one_hour );
  parts[1] = '' + Math.floor( (elapsed % one_hour) / one_minute );
  parts[2] = '' + Math.floor( ( (elapsed % one_hour) % one_minute ) / one_second );

  parts[0] = (parts[0].length == 1) ? '0' + parts[0] : parts[0];
  parts[1] = (parts[1].length == 1) ? '0' + parts[1] : parts[1];
  parts[2] = (parts[2].length == 1) ? '0' + parts[2] : parts[2];

  face.innerText = parts.join(':');
  
  requestAnimationFrame(tick);
  
}