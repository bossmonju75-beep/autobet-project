function startBackgroundWorker() {
    console.log("PRO X AI Background Engine Started...");
    
    setInterval(async () => {
        try {
            const res = await fetch('https://draw.ar-lottery01.com/WinGo/WinGo_30S/GetHistoryIssuePage.json');
            const text = await res.text();
            
            // চেক করা রেসপন্সটা আসলেই JSON নাকি HTML
            if (text.trim().startsWith('<')) {
                console.log("[Background Worker] Waiting for valid API response...");
                return;
            }
            
            const data = JSON.parse(text);
            if(data && data.data && data.data.list && data.data.list.length > 0) {
                const latestIssue = data.data.list[0].issueNumber || data.data.list[0].period || 'OK';
                console.log(`[Background Worker] Active. Latest Period: ${latestIssue}`);
            }
        } catch(err) {
            console.log("Background fetch error:", err.message);
        }
    }, 10000);
}
