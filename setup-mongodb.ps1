# MongoDB Replica Set Setup Script for Windows
# Run this script as Administrator

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "MongoDB Replica Set Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is installed
$dockerInstalled = Get-Command docker -ErrorAction SilentlyContinue

if ($dockerInstalled) {
    Write-Host "✓ Docker detected" -ForegroundColor Green
    Write-Host ""
    Write-Host "Starting MongoDB with Docker..." -ForegroundColor Yellow
    
    # Check if docker-compose.yml exists
    if (Test-Path "docker-compose.yml") {
        Write-Host "✓ docker-compose.yml found" -ForegroundColor Green
        
        # Start Docker containers
        docker-compose up -d
        
        Write-Host ""
        Write-Host "Waiting for MongoDB to initialize (30 seconds)..." -ForegroundColor Yellow
        Start-Sleep -Seconds 30
        
        Write-Host ""
        Write-Host "✓ MongoDB is running!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Connection String:" -ForegroundColor Cyan
        Write-Host "mongodb://admin:password123@localhost:27017/portfolio?authSource=admin&replicaSet=rs0" -ForegroundColor White
        Write-Host ""
        Write-Host "Add this to your .env.local file:" -ForegroundColor Yellow
        Write-Host 'MONGODB_URI=mongodb://admin:password123@localhost:27017/portfolio?authSource=admin&replicaSet=rs0' -ForegroundColor White
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Cyan
        Write-Host "1. Update your .env.local file with the connection string above" -ForegroundColor White
        Write-Host "2. Run: npx prisma db push" -ForegroundColor White
        Write-Host "3. Run: npm run dev" -ForegroundColor White
        Write-Host ""
        Write-Host "To stop MongoDB: docker-compose down" -ForegroundColor Yellow
        Write-Host "To view logs: docker logs mongodb-portfolio" -ForegroundColor Yellow
    } else {
        Write-Host "✗ docker-compose.yml not found" -ForegroundColor Red
        Write-Host "Please create docker-compose.yml first (see MONGODB_SETUP_GUIDE.md)" -ForegroundColor Yellow
    }
} else {
    Write-Host "✗ Docker not detected" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please choose one of these options:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Option 1: Install Docker Desktop" -ForegroundColor Cyan
    Write-Host "  - Download from: https://www.docker.com/products/docker-desktop" -ForegroundColor White
    Write-Host "  - Install and restart your computer" -ForegroundColor White
    Write-Host "  - Run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 2: Use MongoDB Atlas (Cloud)" -ForegroundColor Cyan
    Write-Host "  - Create free account: https://www.mongodb.com/cloud/atlas" -ForegroundColor White
    Write-Host "  - Get connection string from Atlas dashboard" -ForegroundColor White
    Write-Host "  - Add to .env.local" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 3: Configure Local MongoDB" -ForegroundColor Cyan
    Write-Host "  - See MONGODB_SETUP_GUIDE.md for detailed instructions" -ForegroundColor White
    Write-Host ""
}

Write-Host ""
Write-Host "For more help, see MONGODB_SETUP_GUIDE.md" -ForegroundColor Cyan
Write-Host ""