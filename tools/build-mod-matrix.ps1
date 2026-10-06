param([string[]]$Versions)
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$outputRoot = Join-Path (Split-Path $PSScriptRoot -Parent) 'out\mod-matrix'
New-Item -ItemType Directory -Force -Path $outputRoot | Out-Null
$matrix = [ordered]@{
    'daylight-mod-1.19.3' = @('1.19','1.19.1','1.19.2','1.19.3')
    'daylight-mod-1.19' = @('1.19.4')
    'daylight-mod-1.20.4' = @('1.20','1.20.1','1.20.2','1.20.3','1.20.4')
    'daylight-mod-1.20' = @('1.20.5','1.20.6')
    'daylight-mod-1.21.5' = @('1.21','1.21.1','1.21.2','1.21.3','1.21.4','1.21.5')
    'daylight-mod-1.21.8' = @('1.21.6','1.21.7','1.21.8')
    'daylight-mod-1.21.11' = @('1.21.9','1.21.10','1.21.11')
    'daylight-mod' = @('26.2')
}
$results = @()
if ($Versions -and (Test-Path (Join-Path $outputRoot 'summary.json'))) {
    $previous = Get-Content -Raw (Join-Path $outputRoot 'summary.json') | ConvertFrom-Json
    $results = @($previous | Where-Object { $_.Version -notin $Versions })
}
foreach ($project in $matrix.Keys) {
    foreach ($version in $matrix[$project]) {
        if ($Versions -and $version -notin $Versions) { continue }
        $env:JAVA_HOME = if ($version -eq '26.2') { 'C:\Program Files\Eclipse Adoptium\jdk-25.0.3.9-hotspot' } else { 'C:\Users\Alexj\.jdks\ms-21.0.11' }
        $log = Join-Path $outputRoot "$version.log"
        Push-Location (Join-Path $projectRoot $project)
        try {
            $argsForBuild = @('build','--console=plain','--no-daemon',"-Pminecraft_version=$version")
            if ($version -ne '26.2') {
                $yarn = (Invoke-RestMethod "https://meta.fabricmc.net/v2/versions/yarn/$version")[0].version
                $facet = [uri]::EscapeDataString('["'+$version+'"]')
                $api = (Invoke-RestMethod "https://api.modrinth.com/v2/project/fabric-api/version?game_versions=$facet&loaders=%5B%22fabric%22%5D")[0].version_number
                if (-not $yarn -or -not $api) { throw 'Missing version metadata' }
                $argsForBuild += @("-Pyarn_mappings=$yarn", "-Pfabric_api_version=$api")
            }
            $ErrorActionPreference='Continue'
            & .\gradlew.bat @argsForBuild *> $log
            $exitCode=$LASTEXITCODE
            $ErrorActionPreference='Stop'
            if ($exitCode -eq 0) { Copy-Item -LiteralPath 'build\libs\daylight-1.0.0.jar' -Destination (Join-Path $outputRoot "daylight-mod-$version.jar") }
            $results += [PSCustomObject]@{Version=$version;Project=$project;ExitCode=$exitCode;Log=$log}
            Write-Output "$version : exit $exitCode"
            if ($exitCode -ne 0) { Select-String -Path $log -Pattern 'error:|What went wrong' -Context 0,2 | Select-Object -First 8 }
        } catch {
            $results += [PSCustomObject]@{Version=$version;Project=$project;ExitCode=1;Error=$_.Exception.Message}
            Write-Output "$version : $($_.Exception.Message)"
        } finally { Pop-Location }
        $results | ConvertTo-Json | Out-File -Encoding utf8 (Join-Path $outputRoot 'summary.json')
    }
}
if ($results.Where({$_.ExitCode -ne 0}).Count) { exit 1 }
