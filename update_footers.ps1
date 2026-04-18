# PowerShell script to update all HTML footers to match frontend.html

$newFooter = @"
    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h3>About RDB</h3>
                    <p>
                        Regional Development Bank is the premier state-owned development bank in Sri Lanka, dedicated to uplifting the grassroots economy.
                    </p>
                    <div class="footer-social-links">
                        <a href="https://www.facebook.com/RDBOfficial" target="_blank" aria-label="Facebook">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </a>
                        <a href="https://www.instagram.com/RDBOfficial" target="_blank" aria-label="Instagram">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.217.63c-.688.297-1.272.705-1.856 1.289-.584.584-.992 1.168-1.289 1.856-.297.688-.498 1.558-.558 2.837C.008 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.837.297.688.705 1.272 1.289 1.856.584.584 1.168.992 1.856 1.289.688.297 1.559.499 2.837.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.261 2.837-.558.688-.297 1.272-.705 1.856-1.289.584-.584.992-1.168 1.289-1.856.297-.688.499-1.559.558-2.837.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.261-2.148-.558-2.837-.297-.688-.705-1.272-1.289-1.856-.584-.584-1.168-.992-1.856-1.289-.688-.297-1.559-.499-2.837-.558C15.667.008 15.26 0 12 0zm0 2.16c3.203 0 3.585.009 4.849.07 1.171.054 1.805.244 2.227.408.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.354 1.057.408 2.227.06 1.264.07 1.646.07 4.849s-.01 3.585-.07 4.849c-.054 1.171-.244 1.805-.408 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.057.354-2.227.408-1.264.06-1.646.07-4.849.07s-3.585-.01-4.849-.07c-1.171-.054-1.805-.244-2.227-.408-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.354-1.057-.408-2.227-.06-1.264-.07-1.646-.07-4.849s.009-3.585.07-4.849c.054-1.171.244-1.805.408-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057-.354 2.227-.408 1.264-.06 1.646-.07 4.849-.07z"/></svg>
                        </a>
                        <a href="https://www.youtube.com/@RDBOfficial" target="_blank" aria-label="YouTube">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        </a>
                        <a href="https://www.tiktok.com/@RDBOfficial" target="_blank" aria-label="TikTok">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.498 3.094c1.871.769 3.331 2.312 4.037 4.156.165.422.3.87.37 1.329 1.396.775 2.315 2.283 2.315 3.988 0 2.502-2.023 4.525-4.524 4.525-.784 0-1.525-.2-2.167-.55.066.499.1 1.006.1 1.518 0 4.463-3.622 8.086-8.086 8.086s-8.086-3.623-8.086-8.086 3.622-8.086 8.086-8.086c.878 0 1.725.131 2.522.384V1.896c-.46-.024-.93-.04-1.408-.04-5.84 0-10.86 4.296-11.738 9.918-.212 1.322-.326 2.68-.326 4.067 0 8.836 7.164 16 16 16s16-7.164 16-16c0-4.26-1.684-8.121-4.423-10.931-.068-.107-.137-.21-.208-.308.003-.022.007-.043.01-.065.108-.85.163-1.71.145-2.578z"/></svg>
                        </a>
                        <a href="https://www.linkedin.com/company/RDBOfficial" target="_blank" aria-label="LinkedIn">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.047-8.842 0-9.769h3.554v1.383c.43-.664 1.199-1.608 2.925-1.608 2.137 0 3.74 1.396 3.74 4.393v5.601zM5.337 9.433c-1.144 0-1.915-.758-1.915-1.707 0-.956.771-1.71 1.906-1.71.144 0 .288 0 .43.022 1.146.025 1.919.761 1.919 1.71 0 .949-.773 1.707-1.915 1.707zm1.946 11.019H3.391V9.684h3.892v10.768z"/></svg>
                        </a>
                        <a href="https://twitter.com/RDBOfficial" target="_blank" aria-label="Twitter">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 002.856-3.89 9.958 9.958 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                        </a>
                        <a href="mailto:info@rdb.lk" aria-label="Email">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                        </a>
                    </div>
                    <div class="footer-links-section">
                        <ul class="footer-meta-links">
                            <li><a href="Careers.html">Careers</a></li>
                            <li><a href="#privacy">Privacy Policy</a></li>
                            <li><a href="#company-policies">Company Policies</a></li>
                            <li><a href="#sitemap">Sitemap</a></li>
                            <li><a href="#complaints">Complaints & Grievances</a></li>
                            <li><a href="#terms">Terms of use</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-col">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="About_us.html">About Us</a></li>
                        <li><a href="Board_of_Directors.html">Board of Directors</a></li>
                        <li><a href="Financial_Reports.html">Financial Reports</a></li>
                        <li><a href="Procurement.html">Procurement</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3>Services</h3>
                    <ul>
                        <li><a href="Savings_Investments.html">Savings Accounts</a></li>
                        <li><a href="Loans_&_Advances.html">Agricultural Loans</a></li>
                        <li><a href="leasing.html">Leasing</a></li>
                        <li><a href="RDB_Services.html">RDB WePay</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3>Contact Us</h3>
                    <ul>
                        <li>Hotline: 1972</li>
                        <li>Email: info@rdb.lk</li>
                        <li>No. 16, Sir Chittampalam A. Gardiner Mawatha, Colombo 02</li>
                    </ul>
                </div>
            </div>
            <div class="copyright">
                &copy; 2023 Regional Development Bank. All Rights Reserved.
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js" defer></script>
    <script async type='module' src='https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js'></script>
    <zapier-interfaces-chatbot-embed is-popup='true' chatbot-id='cmkidjmel004jey6rmxo23vr8'></zapier-interfaces-chatbot-embed>
</body>

</html>
"@

$htmlFolder = "HTML"
$files = Get-ChildItem -Path $htmlFolder -Filter "*.html" | Where-Object { $_.Name -ne "frontend.html" }

Write-Host "Found $($files.Count) HTML files to update (excluding frontend.html)"

foreach ($file in $files) {
    Write-Host "Processing: $($file.Name)"
    
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Find footer start using regex
    $pattern = '(?s)(\s*)<footer>.*?</html>\s*$'
    if ($content -match $pattern) {
        # Replace everything from <footer> to end of file
        $content = $content -replace $pattern, $newFooter
        
        # Save the file
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "  Updated $($file.Name)" -ForegroundColor Green
    } else {
        Write-Host "  Could not find footer in $($file.Name)" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Footer update complete!" -ForegroundColor Cyan
