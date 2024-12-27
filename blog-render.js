const API_BASE = "https://raw.githubusercontent.com/DedFishy/blog/main/"
const PARAMETERS = new URLSearchParams(window.location.search);
const CONTENT_ELEMENT = document.getElementById("post-content");
const TITLE_ELEMENT = document.getElementById("title");

const PATH = PARAMETERS.get("path");
const TITLE = PARAMETERS.get("title");

if (PATH == undefined || TITLE == undefined) {
    window.location.replace("/");
}

async function getPostContents(path) {
    var url = API_BASE + path;
    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const text = await response.text();
        return text;
      } catch (error) {
        console.error(error.message);
      }
}

async function loadPath() {
    CONTENT_ELEMENT.innerHTML = marked.parse(
        await getPostContents(PATH)
    );
}

loadPath();

TITLE_ELEMENT.innerText = TITLE;