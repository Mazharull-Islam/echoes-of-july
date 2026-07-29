$r = Invoke-WebRequest -Uri 'http://127.0.0.1:3000/' -UseBasicParsing -TimeoutSec 20
$c = $r.Content
$idx = $c.IndexOf('PLACEHOLDER PHOTO')
if ($idx -lt 0) { Write-Host 'NOT FOUND' } else { Write-Host $c.Substring($idx, 1100) }
