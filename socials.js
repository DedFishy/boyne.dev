const notification_element = document.getElementById("notification");

function load_social(social_element) {
    const social = social_element.getAttribute("social");
    if (social.startsWith("http")) {
        
        social_element.onclick = () => {
            show_notification("Opening link...");
            document.location.href = social;
        }
    } else {
        social_element.onclick = () => {
            navigator.clipboard.writeText(social);
            show_notification("Copied social!");
        };
    }
}

function show_notification(text) {
    notification_element.innerText = text;
    notification_element.classList.add("showing");
    setTimeout(()=> {notification_element.classList.remove("showing");}, 2000);
}

const social_elements = document.getElementById("socials").children;
for (let element of social_elements) {
    load_social(element);
}