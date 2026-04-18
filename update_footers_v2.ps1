$htmlDir = "c:\Users\pramo\Desktop\webProject-main (1)\webProject-main\HTML"

# Read the canonical footer from frontend.html
$frontendContent = Get-Content "$htmlDir\frontend.html" -Raw
$footerMatch = [regex]::Match($frontendContent, '(?s)(<footer>.*?</footer>)')
if (-not $footerMatch.Success) {
    Write-Host "ERROR: Could not find footer in frontend.html"
    exit 1
}
$canonicalFooter = $footerMatch.Value

# Update the footer:
# 1. Change copyright year to 2025
# 2. Link "Complaints & Grievances" to complaint_form.html
# 3. Ensure Branch Network and Contact Us links are present
$canonicalFooter = $canonicalFooter -replace '&copy; \d{4}', '&copy; 2025'
$canonicalFooter = $canonicalFooter -replace '<a href="#complaints">Complaints &amp; Grievances</a>', '<a href="complaint_form.html">Complaints &amp; Grievances</a>'
# Also handle the case where & is used instead of &amp;
$canonicalFooter = $canonicalFooter -replace '<a href="#complaints">Complaints & Grievances</a>', '<a href="complaint_form.html">Complaints & Grievances</a>'

$replaced = 0
$added = 0
$unchanged = 0

Get-ChildItem "$htmlDir\*.html", "$htmlDir\*.HTML" | Where-Object { $_.Name -ne 'admin.html' } | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -Encoding UTF8
    $name = $_.Name
    
    if ($content -match '(?s)<footer>.*?</footer>') {
        # Replace existing footer
        $newContent = [regex]::Replace($content, '(?s)\s*<footer>.*?</footer>', "`n    $canonicalFooter")
        if ($newContent -ne $content) {
            [System.IO.File]::WriteAllText($_.FullName, $newContent, [System.Text.Encoding]::UTF8)
            $replaced++
            Write-Host "REPLACED: $name"
        } else {
            $unchanged++
            Write-Host "UNCHANGED: $name"
        }
    } else {
        # No footer - add before </body>
        $newContent = $content -replace '(</body>)', "$canonicalFooter`n`$1"
        [System.IO.File]::WriteAllText($_.FullName, $newContent, [System.Text.Encoding]::UTF8)
        $added++
        Write-Host "ADDED: $name"
    }
}

Write-Host "`n=== SUMMARY ==="
Write-Host "Replaced: $replaced"
Write-Host "Added: $added"
Write-Host "Unchanged: $unchanged"
Write-Host "Total processed: $($replaced + $added + $unchanged)"
