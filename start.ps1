$ErrorActionPreference = "SilentlyContinue"
$port = 3010

Write-Host "🔍 检查端口 $port..." -ForegroundColor Cyan

$connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
if ($connections) {
    Write-Host "⚠️  端口 $port 被占用，正在清理..." -ForegroundColor Yellow
    foreach ($conn in $connections) {
        $proc = Get-Process -Id $conn.OwningProcess -ErrorAction SilentlyContinue
        if ($proc) {
            Write-Host "   停止进程: $($proc.Name) (PID: $($proc.Id))" -ForegroundColor Red
            Stop-Process -Id $conn.OwningProcess -Force
        }
    }
    Start-Sleep -Seconds 1
    Write-Host "✅ 端口已清理" -ForegroundColor Green
} else {
    Write-Host "✅ 端口 $port 可用" -ForegroundColor Green
}

Write-Host ""
Write-Host "🚀 启动开发服务器..." -ForegroundColor Cyan
Write-Host ""

$env:Path = "C:\Users\asus\AppData\Local\nvm\v22.14.0;" + $env:Path
npm run dev
