const lanyard_url = "https://api.lanyard.rest/v1/users/645264167623983124";

const online_status_element = document.getElementById("online-status");
const online_status_image = document.getElementById("online-status-image");
const online_status_description = document.getElementById("online-status-description");
const online_status_header = document.getElementById("online-status-header");
const online_status_subheader = document.getElementById("online-status-subheader");
const online_status_state = document.getElementById("online-status-state");
const online_status_details = document.getElementById("online-status-details");

const header_quote = document.getElementById("header-quote");

async function get_lanyard_status() {
    let request_result = await fetch(lanyard_url);
    let request_json = (await request_result.json())["data"];
    return await request_json
}

function construct_online_status(json) {
    // Online/Offline indicator
    if (json["discord_status"] == "online") {
        online_status_header.innerText = "online";
        online_status_subheader.innerText = "just hanging out";
        online_status_image.classList.add("online");
        
    } else if (json["discord_status"] == "idle") {
        online_status_header.innerText = "idle";
        online_status_image.classList.add("idle");
    } else if (json["discord_status"] == "dnd") {
        online_status_header.innerText = "do not disturb";
        online_status_image.classList.add("dnd");
    }
    else {
        online_status_header.innerText = "offline"
        online_status_subheader.innerText = "touching grass"
        online_status_image.classList.add("offline");
    }

    if (json["activities"].length != 0) {

        for (let activity of json["activities"]) {

            if (activity["type"] == 4) {
                header_quote.innerText = activity["state"];
            } else {
                online_status_subheader.innerText = activity["name"].toLowerCase()
                if (activity["state"]) { online_status_state.innerText = activity["state"].toLowerCase() };
                online_status_details.innerText = activity["details"].toLowerCase()
            }

        }

    
    } else if (json["active_on_discord_desktop"] | json["active_on_discord_web"]) {

        online_status_subheader.innerText = "on the computer"

    } else if (json["active_on_discord_mobile"]) {
        online_status_subheader.innerText = "on mobile"
    }

    if (json["spotify"] != null) {
        const spotify = json["spotify"];
        online_status_image.src = spotify["album_art_url"];
        online_status_header.innerText = "spotify"
        online_status_subheader.innerText = (spotify["song"] + "\nby " + spotify["artist"]).toLowerCase()
    }

    console.log(json);
}

function update_lanyard_loop() {
    get_lanyard_status().then(json => {
        online_status_header.innerText = "";
        online_status_subheader.innerText = "";
        online_status_state.innerText = "";
        online_status_details.innerText = "";
        construct_online_status(json);
        setTimeout(update_lanyard_loop, 10000);
    });
}

update_lanyard_loop();