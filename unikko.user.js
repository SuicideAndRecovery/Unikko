// ==UserScript==
// @name     Unikko
// @version  2
// @run-at   document-idle
// @include  https://sanctioned-suicide.org/whats-new/news-feed
// @grant    none
// ==/UserScript==
// License: MIT

(function() {
  'use strict';
  
  // Localized text
  const HIDE_TEXT = 'Hide Reactions';
  const SHOW_TEXT = 'Show Reactions';

  // Create the "button" to hide or show reactions
  let button = document.createElement('a');
  button.className = 'tabs-tab  rippleButton';
  button.innerHTML = HIDE_TEXT;
  button.style.border = '1px dotted black';

  // Put the button onto the page
  let buttonParent = document.querySelector('span.hScroller-scroll');
  let latestActivityButton = document.querySelector('a.tabs-tab:nth-child(5)');
  buttonParent.insertBefore(button, latestActivityButton);

  // Make the button show or hide reactions
  let showReactions = true;

  button.addEventListener('click', function buttonListener() {
    // Toggle showing reactions
    showReactions = !showReactions;
    button.innerHTML = showReactions ? HIDE_TEXT : SHOW_TEXT;
  });

  // Function to return a list of row elements on the News Feed
  function getNewsFeedRows() {
    return document.querySelectorAll('.js-newsFeedTarget li');
  }

  // Function to return true if a row is a reaction
  function isReaction(row) {
    return row.querySelector('.reaction') != null;
  }

  // HTML class to hide an element on SanctionedSuicide
  const HIDE_CLASS = 'u-hidden';

  // Function to show a row element on the News Feed
  function showRow(row) {
    row.classList.remove(HIDE_CLASS);
  }

  // Function to hide a row element on the News Feed
  function hideRow(row) {
    let classList = row.classList;

    if (!classList.contains(HIDE_CLASS)) {
      classList.add(HIDE_CLASS);
    }
  }

  // Periodically show or hide reactions that appear on the page
  setInterval(function intervalShowAndHide() {
    getNewsFeedRows().forEach(function forEachRow(row) {
      if (!isReaction(row)) {
        return;
      }

      if (showReactions) {
        showRow(row);
      } else {
        hideRow(row);
      }
    });
  }, 1000);

})();
