$cmd = (Get-WmiObject -Class Win32_Service -Filter "Name = 'Cloudflared'").PathName

if ($cmd -match '^(?:"(?<exe>[^"]+)"|(?<exe>\S+))\s*(?<args>.*)$') {
    $exe = $matches['exe']
    $args = $matches['args']

    Write-Host "Executable: $exe"
    Write-Host "Arguments: $args"

    # Run directly in current shell
    & $exe $args.Split(' ')
} else {
    Write-Error "Failed to parse service command: $cmd"
}