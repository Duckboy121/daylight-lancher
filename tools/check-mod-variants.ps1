param([switch]$Online)
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$reportRoot = Join-Path (Split-Path $PSScriptRoot -Parent) 'out\mod-validation'
New-Item -ItemType Directory -Force -Path $reportRoot | Out-Null
$projects = @('daylight-mod-1.19.3','daylight-mod-1.19','daylight-mod-1.20.4','daylight-mod-1.20','daylight-mod-1.21.5','daylight-mod-1.21.8','daylight-mod-1.21.11','daylight-mod')
$results = @()
foreach ($project in $projects) {
    $env:JAVA_HOME = if ($project -eq 'daylight-mod') { 'C:\Program Files\Eclipse Adoptium\jdk-25.0.3.9-hotspot' } else { 'C:\Users\Alexj\.jdks\ms-21.0.11' }
    Push-Location (Join-Path $projectRoot $project)
    try {
        $log = Join-Path $reportRoot ($project + '.log')
        $ErrorActionPreference = 'Continue'
        $buildArgs = @('build', '--console=plain', '--no-daemon')
        if (-not $Online) { $buildArgs += '--offline' }
        & .\gradlew.bat @buildArgs *> $log
        $ErrorActionPreference = 'Stop'
        $result = [PSCustomObject]@{ Project=$project; ExitCode=$LASTEXITCODE; Log=$log }
        $results += $result
        Write-Output "$project : exit $($result.ExitCode)"
        if ($result.ExitCode -ne 0) { Get-Content $log -Tail 32 }
    } finally { Pop-Location }
}
$results | ConvertTo-Json | Out-File -Encoding utf8 (Join-Path $reportRoot 'summary.json')
if ($results.Where({$_.ExitCode -ne 0}).Count) { exit 1 }
