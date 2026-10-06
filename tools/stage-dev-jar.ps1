 
 
 
 
 
 
 
 
 

param(
    [string]$Version = "1.21.11"
)

$ErrorActionPreference = "Stop"
$repo = Split-Path -Parent $PSScriptRoot
$jarName = "daylight-mod-$Version.jar"
$source = Join-Path $repo "bundled\$jarName"

if (-not (Test-Path $source)) {
    Write-Host "No jar at $source" -ForegroundColor Red
    Write-Host "Build it first, then copy it into bundled\." -ForegroundColor Red
    exit 1
}

$installed = Get-ChildItem "$env:LOCALAPPDATA\Programs" -Recurse -Filter $jarName -ErrorAction SilentlyContinue |
             Select-Object -First 1

if (-not $installed) {
    Write-Host "Could not find an installed launcher containing $jarName." -ForegroundColor Yellow
    Write-Host "Is Daylight installed? Looked under $env:LOCALAPPDATA\Programs" -ForegroundColor Yellow
    exit 1
}

Copy-Item $source $installed.FullName -Force

 
 
 
$packJar = Join-Path $env:APPDATA ".daylight\packs\daylight\mods\daylight-mod.jar"
if (Test-Path $packJar) {
    Copy-Item $source $packJar -Force
    Write-Host "also refreshed the pack copy" -ForegroundColor DarkGray
}

$size = (Get-Item $source).Length
Write-Host "staged $jarName ($size bytes)" -ForegroundColor Green
Write-Host "  -> $($installed.FullName)" -ForegroundColor DarkGray
Write-Host "Relaunch the pack to pick it up."
