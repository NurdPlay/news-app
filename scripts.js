const apiKey = process.env.NEWS_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}`

async function fetchNews() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      displayNews(data.articles);
    } catch (error) {
      console.error('There was an error!', error);
    }
  }

  function displayNews(articles) {
    for (const article of articles) {
        let title = document.createElement('p');
        title.textContent = article.title;
        
        let image = document.createElement('img');
        image.src = article.urlToImage;

        
        let description = document.createElement("p");
        description.textContent = article.description;

        let link = document.createElement("a");
        link.href = article.url;
        link.textContent = "Read More";

        let newsDiv = document.getElementById('news');
        newsDiv.appendChild(title);
        newsDiv.appendChild(image);
        newsDiv.appendChild(description);
        newsDiv.appendChild(link);
    }
  }
  
  fetchNews();