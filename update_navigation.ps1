$htmlFolder = "c:\Users\pramo\Desktop\webProject-main (1)\webProject-main\HTML"
$logFile = "c:\Users\pramo\Desktop\webProject-main (1)\webProject-main\nav_update.log"
$filesCount = 0
$failedFiles = @()

$newNav = @'
    <!-- Navigation -->
    <nav class="navigation" id="navbar">
        <div class="nav-container">
            <a href="frontend.html" class="logo">
                <div class="logo-icon">
                    <img src="../Assests/Images/Regional_Development_Bank_Logo.png" alt="RDB BANK" class="logo-img">
                </div>
            </a>

            <div class="nav-links" id="navLinks">
                <a href="frontend.html" class="nav-link active">Home</a>
                <div class="nav-dropdown">
                    <button class="nav-link dropdown-trigger">About Us</button>
                    <div class="dropdown-menu">
                        <a href="About_us.html" class="dropdown-item">About RDB</a>
                        <a href="Chairman.html" class="dropdown-item">Chairman</a>
                        <a href="GeneralManager.html" class="dropdown-item">General Manager/CEO</a>
                        <a href="Board_of_Directors.html" class="dropdown-item">Board of Directors</a>
                        <a href="CorporateManagement.html" class="dropdown-item">Corporate Management</a>
                        <a href="ExecutiveManagement.html" class="dropdown-item">Executive Management</a>
                    </div>
                </div>
                <a href="careers.html" class="nav-link">Careers</a>
                <div class="nav-dropdown">
                    <button class="nav-link dropdown-trigger" type="button" id="productsBtn" aria-haspopup="true" aria-expanded="false" aria-controls="productsMenu">
                        Products & Services
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                    <div class="dropdown-menu glass" id="productsMenu" role="menu" aria-hidden="true">
                        <a href="Savings_Investments.html" class="dropdown-item" role="menuitem" tabindex="-1">Savings & Investments</a>
                        <a href="Loans_&_Advances.html" class="dropdown-item" role="menuitem" tabindex="-1">Loans & Advances</a>
                        <a href="leasing.html" class="dropdown-item" role="menuitem" tabindex="-1">Leasing</a>
                        <a href="RDB_Services.html" class="dropdown-item" role="menuitem" tabindex="-1">Other Services</a>
                    </div>
                </div>
                <a href="RDB_Services.html" class="nav-link">Info</a>
                <div class="nav-dropdown">
                    <button class="nav-link dropdown-trigger">MediaRoom</button>
                    <div class="dropdown-menu">
                        <a href="AlertPage.html" class="dropdown-item">Alerts</a>
                        <a href="Awards_&_Recognition.html" class="dropdown-item">Awards & Recognition</a>
                    </div>
                </div>
                <a href="branch_network.html" class="nav-link">Branch Network</a>
                <a href="contact_us.html" class="nav-link">Contact Us</a>
                <div class="nav-search">
                    <button class="search-btn" id="searchBtn" aria-label="Search">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                    </button>
                    <input type="text" class="search-input" id="searchInput" placeholder="Search..." aria-label="Search">
                </div>
            </div>
        </div>
    </nav>
'@

"Starting navigation update at $(Get-Date)" | Out-File -FilePath $logFile -Encoding UTF8

Get-ChildItem -Path $htmlFolder -Filter "*.html" | Where-Object { 
    $_.Name -ne "admin.html" -and 
    $_.Name -ne "complaint_form.html" -and 
    $_.Name -ne "frontend.html" 
} | ForEach-Object {
    $filePath = $_.FullName
    $fileName = $_.Name
    
    try {
        $content = Get-Content $filePath -Raw -Encoding UTF8
        
        # Try to find and replace navigation section
        $updated = $false
        $newContent = $content
        
        # Pattern 1: With HTML comment - find from <!-- Navigation --> to </nav>
        if ($content -match '<!-- Navigation -->') {
            # Find the closing nav tag
            $startIndex = $content.IndexOf('<!-- Navigation -->')
            $endIndex = $content.IndexOf('</nav>', $startIndex)
            if ($startIndex -ge 0 -and $endIndex -ge 0) {
                $beforeNav = $content.Substring(0, $startIndex)
                $afterNav = $content.Substring($endIndex + 6)
                $newContent = $beforeNav + $newNav + "`n" + $afterNav
                $updated = $true
            }
        }
        
        if ($updated -and $newContent -ne $content) {
            Set-Content -Path $filePath -Value $newContent -Encoding UTF8
            $filesCount++
            "[OK] Updated: $fileName" | Out-File -FilePath $logFile -Encoding UTF8 -Append
        } else {
            "[$fileName] - No changes made" | Out-File -FilePath $logFile -Encoding UTF8 -Append
        }
    } catch {
        $failedFiles += $fileName
        "[ERROR] $fileName : $($_.Exception.Message)" | Out-File -FilePath $logFile -Encoding UTF8 -Append
    }
}

"" | Out-File -FilePath $logFile -Encoding UTF8 -Append
"Updated: $filesCount files" | Out-File -FilePath $logFile -Encoding UTF8 -Append
"Failed: $($failedFiles.Count) files - $($failedFiles -join ', ')" | Out-File -FilePath $logFile -Encoding UTF8 -Append
"Completed at $(Get-Date)" | Out-File -FilePath $logFile -Encoding UTF8 -Append

Write-Host "Navigation update complete. Check $logFile for details."
