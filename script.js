// 🔥 Firebase config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    databaseURL: "https://honey-badger-home-default-rtdb.firebaseio.com/"
};

// init Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();


// ===============================
// CLICK CONTROL (WEB → FIREBASE)
// ===============================
document.addEventListener("click", function (e) {
    const btn = e.target.closest("[data-device-id]");
    if (!btn) return;

    const id = btn.getAttribute("data-device-id");
    const ref = db.ref("devices/" + id);

    ref.get().then(snapshot => {
        let state = snapshot.val();

        if (state === "ON") {
            ref.set("OFF");
        } else {
            ref.set("ON");
        }
    });
});


// ===============================
// LIVE STATE (FIREBASE → WEB)
// ===============================
db.ref("devices").on("value", snapshot => {
    const data = snapshot.val();

    document.querySelectorAll("[data-device-id]").forEach(btn => {
        const id = btn.getAttribute("data-device-id");

        if (!data) return;

        if (data[id] === "ON") {
            btn.classList.remove("btn-primary");
            btn.classList.add("btn-success");
            btn.innerText = id + " ON";
        } else {
            btn.classList.remove("btn-success");
            btn.classList.add("btn-primary");
            btn.innerText = id + " OFF";
        }
    });
});
