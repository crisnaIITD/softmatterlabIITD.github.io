let papersIndex = 0;
let chaptersIndex = 0;
let conferencesIndex = 0;
const itemsPerPage = 5;
let data = {};

// Load JSON data from publications.json
async function loadPublications() {
  try {
    const response = await fetch('Publications/publications.json');
    if (!response.ok) {
      throw new Error('Failed to fetch JSON data');
    }
    data = await response.json();
    populateData('Papers', papersIndex, 'publications-list');
    populateData('Book Chapters', chaptersIndex, 'chapters-list');
    populateData('Conference Presentations', conferencesIndex, 'conferences-list');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Populate HTML with JSON data
function populateData(category, startIndex, elementId) {
  const listElement = document.getElementById(elementId);
  const endIndex = startIndex + itemsPerPage;
  data[category].slice(startIndex, endIndex).forEach((item) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = generateHTML(item);
    listElement.appendChild(listItem);
  });
}

// Generate HTML based on item fields
function generateHTML(item) {
  let html = `<strong>${item.Title}</strong><br>Authors: ${item.Authors}<br>`;
  if (item.Journal) html += `Journal: ${item.Journal}<br>`;
  if (item.Book) html += `Book: ${item.Book}<br>`;
  if (item.Year) html += `Year: ${item.Year}<br>`;
  if (item.ISBN) html += `ISBN: ${item.ISBN}<br>`;
  if (item.URL) html += `URL: <a href="${item.URL}">${item.URL}</a><br>`;
  if (item.Conference) html += `Conference: ${item.Conference}<br>`;
  if (item.Location) html += `Location: ${item.Location}<br>`;
  return html;
}

// Load more items
function loadMore(category, elementId) {
  let index;
  if (category === 'Papers') {
    papersIndex += itemsPerPage;
    index = papersIndex;
  } else if (category === 'Book Chapters') {
    chaptersIndex += itemsPerPage;
    index = chaptersIndex;
  } else {
    conferencesIndex += itemsPerPage;
    index = conferencesIndex;
  }
  populateData(category, index, elementId);
}

// Show fewer items
function showLess(category, elementId) {
  let index;
  if (category === 'Papers') {
    papersIndex = Math.max(papersIndex - itemsPerPage, 0);
    index = papersIndex;
  } else if (category === 'Book Chapters') {
    chaptersIndex = Math.max(chaptersIndex - itemsPerPage, 0);
    index = chaptersIndex;
  } else {
    conferencesIndex = Math.max(conferencesIndex - itemsPerPage, 0);
    index = conferencesIndex;
  }
  const listElement = document.getElementById(elementId);
  listElement.innerHTML = ''; // Clear the current list
  populateData(category, 0, elementId); // Repopulate from the beginning up to the new index
}

// Load publications when the document is ready
document.addEventListener('DOMContentLoaded', loadPublications);
