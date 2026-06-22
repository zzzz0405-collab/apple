永芳出貨標籤 Web App 測試版

使用方式：

1. 在 Mac 上雙擊 index.html 可以先預覽。
2. 要用 iPhone 測試，建議在這個資料夾開本機伺服器：
   cd ~/Desktop/我試試看
   python3 -m http.server 8080
3. iPhone 和 Mac 連同一個 Wi-Fi。
4. iPhone Safari 開啟：
   http://你的MacIP:8080
5. 可用 Safari 的分享按鈕「加入主畫面」。

注意：

- Web App 不能直接連 XP-420P 的 9100 port。
- Safari 系統列印通常需要 AirPrint，XP-420B 多半不支援，所以目前不走系統列印。
- 目前流程是產生 PNG 標籤圖片，再分享或下載，拿去芯燁 / Xprinter App 測試列印。
- iPhone Safari 的檔案分享功能可能需要 HTTPS 才完整支援；若分享按鈕不能用，請先產生圖片，再長按圖片儲存或分享。
- 客戶與品項資料已內建目前 App 的資料。
