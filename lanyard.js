const LANYARD_ENABLED = false;

const lanyard_url = "https://api.lanyard.rest/v1/users/645264167623983124";

const online_status_element = document.getElementById("online-status");
const spotify_song_element = document.getElementById("lanyard-track-name");
const activity_element = document.getElementById("lanyard-activity-name");

async function get_lanyard_status() {
    let request_result = await fetch(lanyard_url);
    let request_json = (await request_result.json())["data"];
    return await request_json
}

function construct_online_status(json) {
    // Online/Offline indicator
    if (json["discord_status"] == "online") {
        online_status_element.className = "online"
        
    } else if (json["discord_status"] == "idle") {
        online_status_element.className = "idle"
    } else if (json["discord_status"] == "dnd") {
        online_status_element.className = "dnd"
    }
    else {
        online_status_element.className = "offline"
    }

    if (json["activities"].length != 0) {

        online_status_element.className = "activity"

        for (let activity of json["activities"]) {

            if (activity["type"] == 4) {
                //activity_element.innerText = activity["state"];
            } else {
                //online_status_element.innerText = activity["name"].toLowerCase()
                //if (activity["state"]) { online_status_element.innerText = activity["state"].toLowerCase() };
                //online_status_element.innerText = activity["details"].toLowerCase()
                activity_element.innerText = activity["name"];
            }

        }
    }

    if (json["spotify"] != null) {
        online_status_element.className = "spotify"
        const spotify = json["spotify"];
        spotify_song_element.innerHTML = "<strong>" + spotify["song"] + "</strong> by <strong>" + spotify["artist"] + "</strong>"
    }

    console.log(json);
}

function update_lanyard_loop() {
    get_lanyard_status().then(json => {
        construct_online_status(json);
        setTimeout(update_lanyard_loop, 10000);
    });
}

if (LANYARD_ENABLED) update_lanyard_loop();