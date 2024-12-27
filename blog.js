const BLOG_ELEMENT = document.getElementById("blog-post-list");
const API_BASE = "https://api.github.com/repos/DedFishy/blog/contents/";

const PostElementGenerator = (title, date, path) => {
    const postElement = document.createElement("a");
    postElement.className = "blog-post";
    postElement.href = "/blog.html?path=" + path + "&title=" + title;

    const postTitleElement = document.createElement("h1");
    postTitleElement.className = "blog-post-title";
    postTitleElement.innerText = title;

    const postDateElement = document.createElement("div");
    postDateElement.className = "blog-post-date";
    postDateElement.innerText = "Posted on " + date;

    postElement.appendChild(postTitleElement);
    postElement.appendChild(postDateElement);

    return postElement;
}

async function getPathContents(path) {
    var url = API_BASE + path;
    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        return json;
      } catch (error) {
        console.error(error.message);
      }
}

async function getPostMap(limit) {

    var posts = []

    var yearsRaw = await getPathContents("");
    var years = yearsRaw.map((x) => x.name);

    for(const year of years) {

        var monthsRaw = await getPathContents(year)
        var months = monthsRaw.map((x) => x.name);

        for(const month of months) {

            var daysRaw = await getPathContents(year + "/" + month);
            var days = daysRaw.map((x) => x.name);

            for(const day of days) {

                var postsRaw = await getPathContents(year + "/" + month + "/" + day);
                
                for(const postRaw of postsRaw) {
                    posts = posts.concat({
                        "title": postRaw.name.replaceAll(".md", ""),
                        "date": year + "/" + month + "/" + day,
                        "path": encodeURIComponent(year + "/" + month + "/" + day + "/" + postRaw.name)
                    });
                    if (limit != -1 && posts.length >= limit) {
                        return posts;
                    }
                }

            }
        }
    }
    return posts;
}

async function populatePosts(limit) {
    var posts = await getPostMap(limit);
    BLOG_ELEMENT.innerHTML = "";
    for(const post of posts) {
        BLOG_ELEMENT.appendChild(PostElementGenerator(post.title, post.date, post.path))
    }
}