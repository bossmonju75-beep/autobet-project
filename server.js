const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// পাবলিক ফোল্ডার থেকে ফ্রন্টএন্ড ওয়েবসাইট দেখানোর জন্য
app.use(express.static('public'));

// ব্যাকগ্রাউন্ড অটোমেশন ওয়ার্কার (সার্ভারে ২৪ ঘণ্টা চলবে)
function startBackgroundWorker() {
    console.log("PRO X AI Background Engine Started...");
    
    setInterval(async () => {
        try {
            const res = await fetch('https://draw.ar-lottery01.com/WinGo/WinGo_30S/GetHistoryIssuePage.json');
            const data = await res.json();
            if(data && data.data && data.data.list && data.data.list.length > 0) {
                const latestIssue = data.data.list[0].issueNumber || data.data.list[0].period || 'OK';
                console.log(`[Background Worker] Active. Latest Period: ${latestIssue}`);
            }
        } catch(err) {
            console.log("Background fetch error:", err.message);
        }
    }, 10000); // প্রতি ১০ সেকেন্ড পর পর চেক করবে
}

app.listen(PORT, () => {
    console.log(`PRO X AI Server is running on port ${PORT}`);
    startBackgroundWorker();
});
