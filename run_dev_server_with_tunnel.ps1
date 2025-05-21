# Get the Cloudflared service start command
$cmd = (Get-WmiObject -Class Win32_Service -Filter "Name = 'Cloudflared'").PathName

if ($cmd -match '^(?:"(?<exe>[^"]+)"|(?<exe>\S+))\s*(?<args>.*)$') {
    $exe = $matches['exe']
    $args = $matches['args']

    Write-Host "Starting Cloudflared tunnel..."
    Write-Host "Executable: $exe"
    Write-Host "Arguments: $args"

    # Start the tunnel process
    $tunnelProcess = Start-Process -NoNewWindow -PassThru -FilePath $exe -ArgumentList $args.Split(' ')
} else {
    Write-Error "Failed to parse Cloudflared service command: $cmd"
    exit 1
}

# Start the Bun dev server
Write-Host "Starting Bun dev server..."
$bunProcess = Start-Process -NoNewWindow -PassThru -FilePath "bun" -ArgumentList "--watch", "server/index.ts"

# Monitor both
Write-Host "Tunnel PID: $($tunnelProcess.Id)"
Write-Host "Bun    PID: $($bunProcess.Id)"
Write-Host "Press Ctrl+C to stop both."

while ($true) {
    Start-Sleep -Seconds 1

    if ($tunnelProcess.HasExited) {
        Write-Host "`nTunnel process exited. Stopping Bun..."
        Stop-Process -Id $bunProcess.Id -Force
        break
    }

    if ($bunProcess.HasExited) {
        Write-Host "`nBun process exited. Stopping Tunnel..."
        Stop-Process -Id $tunnelProcess.Id -Force
        break
    }
}
