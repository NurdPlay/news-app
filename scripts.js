import 'dotenv/config'
const apiKey = process.env.NEWS_API_KEY;
let currentCategory = 'technology'; // Default category
let url = `https://newsapi.org/v2/everything?apiKey=${apiKey}&q=${currentCategory}`;

const categorySelector = document.getElementById('category');
const filterButton = document.getElementById('filter-btn');
const newsDiv = document.getElementById('news');

categorySelector.addEventListener('change', (event) => {
    currentCategory = event.target.value;
});

filterButton.addEventListener('click', () => {
    updateNews();
});

async function fetchNews() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('There was an error!', error);
    }
}

async function updateNews() {
    url = `https://newsapi.org/v2/everything?apiKey=${apiKey}&q=${currentCategory}`;
    newsDiv.innerHTML = ''; // Clear existing news
    await fetchNews(); // Fetch and display filtered news
}

function displayNews(articles) {
    let currentRow;

    for (let i = 0; i < articles.length; i++) {
        const article = articles[i];

        if (i % 4 === 0) {
            // Create a new row for every 4th article
            currentRow = document.createElement('div');
            currentRow.className = 'row';
            newsDiv.appendChild(currentRow);
        }

        let articleDiv = document.createElement('div');
        articleDiv.className = 'article';

        let title = document.createElement('h2');
        title.textContent = article.title;

        let image = document.createElement('img');
        image.src = article.urlToImage;

        let description = document.createElement("p");
        description.textContent = article.description;

        let content = document.createElement("p");
        content.textContent = article.content;

        let link = document.createElement("a");
        link.href = article.url;
        link.textContent = "Read More";

        articleDiv.appendChild(title);
        articleDiv.appendChild(image);
        articleDiv.appendChild(description);
        articleDiv.appendChild(content);
        articleDiv.appendChild(link);

        currentRow.appendChild(articleDiv);
    }
}

// Initial fetch and display
fetchNews();
