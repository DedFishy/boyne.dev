function load_cert(cert_element) {
    const cert = cert_element.getAttribute("cert");
    cert_element.onclick = () => {
        document.location.href = "/certifications/" + cert;};
}

const cert_elements = document.getElementById("certifications").children;
for (let element of cert_elements) {
    load_cert(element);
}