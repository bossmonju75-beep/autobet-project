const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// সঠিক পাথ দিয়ে পাবলিক ফোল্ডার কানেক্ট করা
app.use(express.static(path.join(__dirname, 'public')));

// ব্যাকগ্রাউন্ড অটোমেশন ওয়ার্কার
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
    }, 10000);
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    startBackgroundWorker();
});
