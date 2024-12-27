const LANYARD_ENABLED = true;//false;

const lanyard_url = "https://api.lanyard.rest/v1/users/645264167623983124";

const online_status_element = document.getElementById("online-status");
const activity_element = document.getElementById("lanyard-activity-name");

async function get_lanyard_status() {
    let request_result = await fetch(lanyard_url);
    let request_json = (await request_result.json())["data"];
    return await request_json
}

function construct_online_status(json) {
    // Reset
    online_status_element.innerText = ""
    activity_element.innerText = ""

    // Online/Offline indicator
    if (json["discord_status"] == "online") {
        online_status_element.className = "online"
        online_status_element.innerText = "online"
        
    } else if (json["discord_status"] == "idle") {
        online_status_element.className = "idle"
        online_status_element.innerText = "idle"
    } else if (json["discord_status"] == "dnd") {
        online_status_element.className = "dnd"
        online_status_element.innerText = "on do not disturb"
    }
    else {
        online_status_element.className = "offline"
        online_status_element.innerText = "offline"
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
                online_status_element.innerText = "using"
                activity_element.innerText = activity["name"];
            }

        }
    }

    if (json["spotify"] != null) {
        online_status_element.className = "spotify"
        online_status_element.innerText = "listening to"
        const spotify = json["spotify"];
        activity_element.innerHTML = "<strong>" + spotify["song"] + "</strong> by <strong>" + spotify["artist"] + "</strong>"
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